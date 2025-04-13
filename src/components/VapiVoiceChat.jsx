'use client'

import React, { useState, useEffect, useRef } from 'react';
import Vapi from '@vapi-ai/web';
import { Button } from "@/components/ui/button";
import { Mic, MicOff, PhoneOff, Loader2 } from "lucide-react";
import { toast } from 'sonner';
import { cn } from "@/lib/utils";

// Initialize Vapi outside the component to avoid re-initialization on re-renders
// Ensure environment variables are loaded
const vapiPublicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
const vapiAssistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;

// Basic validation at module scope
if (!vapiPublicKey || !vapiAssistantId) {
  console.error(
    "Vapi Public Key or Assistant ID is missing. " +
    "Ensure NEXT_PUBLIC_VAPI_PUBLIC_KEY and NEXT_PUBLIC_VAPI_ASSISTANT_ID are set in your .env.local file."
  );
}

// Helper to summarize data (keep it concise for the AI)
const summarizeFinancialData = (goals, transactions) => {
  const totalGoals = goals.length;
  const recentTransactionsCount = transactions.length; // Assuming transactions passed are recent ones

  const totalSaved = goals.reduce((sum, goal) => sum + (goal.currentAmount || 0), 0);
  const goalsSummary = goals.map(g => `${g.name} (${Math.round((g.currentAmount / g.targetAmount) * 100 || 0)}% complete)`).join(', ');

  const recentExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + (t.amount || 0), 0);
  const recentIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + (t.amount || 0), 0);

  let summary = `User has ${totalGoals} financial goal(s) and ${recentTransactionsCount} recent transaction(s). `;
  if (totalGoals > 0) {
    summary += `Total saved towards goals: ₹${totalSaved.toLocaleString('en-IN')}. Current goals: ${goalsSummary || 'None'}. `;
  }
  if (recentTransactionsCount > 0) {
     summary += `Recent income: ₹${recentIncome.toLocaleString('en-IN')}, Recent expenses: ₹${recentExpenses.toLocaleString('en-IN')}.`;
  }

  // Keep the summary reasonably short
  const MAX_SUMMARY_LENGTH = 300; // Adjust as needed
  if (summary.length > MAX_SUMMARY_LENGTH) {
    summary = summary.substring(0, MAX_SUMMARY_LENGTH) + "...";
  }

  return summary.trim();
};

export default function VapiVoiceChat({ user, goals = [], transactions = [] }) {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const vapiInstance = useRef(null); // Use ref to hold the Vapi instance

  // Check if Vapi is configured properly
  const isVapiConfigured = !!vapiPublicKey && !!vapiAssistantId;

  // Initialize Vapi instance only once
  useEffect(() => {
    if (!isVapiConfigured) {
      return; // Don't initialize if config is missing
    }

    console.log("Initializing Vapi SDK...");
    // Create instance but don't connect yet
    vapiInstance.current = new Vapi(vapiPublicKey);

    // --- Event Listeners ---
    vapiInstance.current.on('call-start', () => {
      console.log('Vapi Call has started');
      setIsConnecting(false);
      setIsSessionActive(true);
      setIsMuted(false); // Ensure mic is unmuted on start
      toast.success("Voice chat connected", { description: "Speak now to get financial advice." });
    });

    vapiInstance.current.on('call-end', () => {
      console.log('Vapi Call has ended');
      setIsConnecting(false);
      setIsSessionActive(false);
      setIsMuted(false);
      // Don't show toast on manual end, only on unexpected hangs up? Maybe add later if needed.
    });

    vapiInstance.current.on('speech-start', () => {
      console.log('User Speech has started');
      // Optionally add visual feedback
    });

    vapiInstance.current.on('speech-end', () => {
      console.log('User Speech has ended');
       // Optionally add visual feedback
    });

    vapiInstance.current.on('error', (e) => {
      console.error('Vapi Call Error:', e);
      setIsConnecting(false);
      setIsSessionActive(false);
      toast.error("Voice chat error", { description: e?.message || "An unknown error occurred." });
    });

    // Add more listeners as needed (e.g., 'message', 'volume-level')

    // --- Cleanup ---
    return () => {
      console.log("Cleaning up Vapi instance...");
      // Ensure call is stopped and resources are released if component unmounts
      if (vapiInstance.current && (isSessionActive || isConnecting)) {
         console.log("Stopping active Vapi call during cleanup...");
         vapiInstance.current.stop();
      }
      // According to Vapi docs, instance might not need explicit destroy,
      // but good practice to remove listeners if possible or ensure stop() cleans up.
      // vapiInstance.current?.destroy(); // Uncomment if destroy method exists and is needed
      vapiInstance.current = null; // Clear the ref
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVapiConfigured]); // Re-run if config becomes available (though unlikely after mount)

  const startVapiCall = () => {
    if (!vapiInstance.current) {
       toast.error("Voice chat is not initialized.");
       console.error("Attempted to start call, but Vapi instance is null.");
       return;
    }
    if (isSessionActive || isConnecting) {
        console.warn("Attempted to start call, but already active or connecting.");
        return; // Prevent multiple calls
    }

    if (!user) {
        toast.error("User not logged in.", { description: "Cannot start voice chat."});
        return;
    }

    setIsConnecting(true);
    toast.info("Connecting voice chat...");

    // Prepare context for the AI assistant
    const financialContext = summarizeFinancialData(goals, transactions);
    const userName = user?.displayName || 'User';

    console.log("Starting Vapi call with Assistant ID:", vapiAssistantId);
    console.log("Context:", { userName, financialSummary: financialContext, userId: user.uid });

    // Start the call with assistant configuration
    vapiInstance.current.start(vapiAssistantId, {
        // Match variable names with your Vapi Assistant's prompt template
        variableValues: {
            userName: userName,
            financialSummary: financialContext,
            // Add any other relevant variables your assistant expects
        },
        // Metadata can be used for logging or routing on Vapi's side
        metadata: {
            userId: user.uid,
            timestamp: new Date().toISOString(),
        }
    }).then(() => {
        console.log("Vapi start command issued successfully.");
        // Note: Actual connection confirmed by 'call-start' event
    }).catch(error => {
        console.error("Failed to initiate Vapi call:", error);
        setIsConnecting(false);
        toast.error("Failed to start voice chat", { description: error?.message || "Please try again." });
    });
  };

  const stopVapiCall = () => {
    if (!vapiInstance.current || !isSessionActive) {
        console.warn("Attempted to stop call, but not active or instance is null.");
        return;
    }
    console.log("Stopping Vapi call manually...");
    setIsConnecting(false); // Stop showing connecting state if stopping early
    vapiInstance.current.stop();
    // `call-end` event will set isSessionActive to false
    toast.info("Voice chat ended.");
  };

  const toggleMute = () => {
     if (!vapiInstance.current || !isSessionActive) {
         console.warn("Attempted to toggle mute, but not active or instance is null.");
         return;
     }
     const newMutedState = !isMuted;
     console.log(`Setting mute state to: ${newMutedState}`);
     vapiInstance.current.setMuted(newMutedState);
     setIsMuted(newMutedState);
     toast.info(newMutedState ? "Microphone muted" : "Microphone unmuted");
  };

  // Final check for disabled state
  const isDisabled = !isVapiConfigured || !user; // Disable if config missing OR user not loaded yet

  if (!isVapiConfigured) {
      return (
          <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled className="gap-1">
                  <MicOff className="h-4 w-4" />
                  Voice Unavailable
              </Button>
              <p className="text-xs text-muted-foreground">(Config missing)</p>
          </div>
      );
  }

  return (
    <div className="flex items-center gap-2">
      {!isSessionActive ? (
        <Button
          onClick={startVapiCall}
          disabled={isConnecting || isDisabled} // Disable if connecting or not configured/logged in
          variant="outline"
          size="sm"
          className="gap-1"
        >
          {isConnecting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Mic className="h-4 w-4" />
          )}
          {isConnecting ? "Connecting..." : "Ask AI Assistant"}
        </Button>
      ) : (
        <>
          <Button
             onClick={toggleMute}
             variant="outline"
             size="icon"
             className={cn(
                "h-9 w-9 shrink-0", // Prevent button shrinking
                isMuted && "text-red-500 hover:bg-destructive/10 hover:text-red-600"
              )}
             aria-label={isMuted ? "Unmute microphone" : "Mute microphone"}
           >
             {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          <Button
            onClick={stopVapiCall}
            variant="destructive"
            size="icon"
            className="h-9 w-9 shrink-0" // Prevent button shrinking
            aria-label="End voice chat"
          >
            <PhoneOff className="h-4 w-4" />
          </Button>
        </>
      )}
      {/* Optional: Show small indicator if button disabled due to user loading */}
      {isDisabled && !isConnecting && !isVapiConfigured && (
         <p className="text-xs text-destructive"> (Login required)</p>
      )}
    </div>
  );
}