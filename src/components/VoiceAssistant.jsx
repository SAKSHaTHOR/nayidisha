"use client";

import { useState, useEffect } from 'react';
import { useVapi, VapiProvider, createVapiAssistant } from '@vapi-ai/web';
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth'; // Assuming you have an auth hook
import { useToast } from "@/components/ui/use-toast";

const Assistant = () => {
  const { setActive, active, ready, status } = useVapi();
  const [isFirstClick, setIsFirstClick] = useState(true);
  const { user } = useAuth(); // Get the current user
  const { toast } = useToast();
  const [previousStatus, setPreviousStatus] = useState(null);

  // Monitor the status of the voice assistant
  useEffect(() => {
    if (status !== previousStatus) {
      setPreviousStatus(status);
      
      // Show toast notifications for relevant status changes
      if (status === 'LISTENING') {
        toast({
          title: "Listening...",
          description: "I'm listening to your request",
          duration: 3000,
        });
      } else if (status === 'THINKING') {
        toast({
          title: "Processing...",
          description: "I'm analyzing your request",
          duration: 3000,
        });
      } else if (status === 'SPEAKING') {
        toast({
          title: "Responding...",
          description: "I'm providing my response",
          duration: 3000,
        });
      } else if (status === 'ERROR') {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong. Please try again.",
          duration: 5000,
        });
      }
    }
  }, [status, previousStatus, toast]);

  const toggleAssistant = () => {
    if (isFirstClick) {
      setIsFirstClick(false);
      toast({
        title: "Voice Assistant Activated",
        description: "You can now talk to your financial assistant",
        duration: 5000,
      });
    }
    setActive(!active);
    
    if (!active) {
      toast({
        title: "Voice Assistant On",
        description: "Speak clearly to ask financial questions or log transactions",
        duration: 3000,
      });
    } else {
      toast({
        title: "Voice Assistant Off",
        description: "Voice assistant has been turned off",
        duration: 3000,
      });
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <Button 
        onClick={toggleAssistant}
        className={`rounded-full w-16 h-16 flex items-center justify-center transition-all ${active ? 'bg-pink-600 hover:bg-pink-700' : 'bg-purple-600 hover:bg-purple-700'}`}
        disabled={!ready}
      >
        {active ? <MicOff size={24} /> : <Mic size={24} />}
      </Button>
      {isFirstClick && (
        <div className="absolute bottom-20 right-0 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg max-w-xs">
          <p className="text-sm">Click to talk with your financial assistant</p>
        </div>
      )}
      {active && status && (
        <div className="absolute bottom-20 right-0 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg">
          <p className="text-sm flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${
              status === 'LISTENING' ? 'bg-green-500 animate-pulse' : 
              status === 'THINKING' ? 'bg-yellow-500 animate-pulse' : 
              status === 'SPEAKING' ? 'bg-blue-500 animate-pulse' : 
              status === 'ERROR' ? 'bg-red-500' : 'bg-gray-400'
            }`}></span>
            {status === 'LISTENING' ? 'Listening...' : 
             status === 'THINKING' ? 'Processing...' : 
             status === 'SPEAKING' ? 'Speaking...' : 
             status === 'ERROR' ? 'Error' : status}
          </p>
        </div>
      )}
    </div>
  );
};

const VoiceAssistant = () => {
  const [apiKey, setApiKey] = useState('');
  const { user } = useAuth(); // Get the current user
  
  useEffect(() => {
    // Get API key from environment variable
    setApiKey(process.env.NEXT_PUBLIC_VAPI_API_KEY || '');
  }, []);

  if (!apiKey) return null;

  // Create the assistant configuration
  const assistantConfig = createVapiAssistant({
    // Use the webhook endpoint we'll create in the next step
    webhookUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/vapi-webhook`,
    // This metadata will be available in the webhook
    metadata: {
      userId: user?.uid || 'anonymous',
    },
    // Configure the assistant's voice and behavior
    assistant: {
      voice: {
        voiceId: "echo", // You can choose from available Vapi voices
      },
      firstMessage: "Hello, I'm your financial assistant. How can I help you today?",
    },
    // Add conversation history management
    conversation: {
      historyEnabled: true,
      saveHistory: true,
    },
    // Customize the appearance
    ui: {
      style: {
        position: "bottom-right",
      },
    },
  });

  return (
    <VapiProvider apiKey={apiKey} assistant={assistantConfig}>
      <Assistant />
    </VapiProvider>
  );
};

export default VoiceAssistant; 