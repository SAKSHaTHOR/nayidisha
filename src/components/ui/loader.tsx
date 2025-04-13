// src/components/ui/loader.jsx

import * as React from "react";
import { Loader2 as LucideLoader2 } from "lucide-react"; // Import the specific icon

import { cn } from "@/lib/utils"; // Import your class merging utility

// Define the props interface, extending standard SVG attributes
export interface Loader2Props extends React.SVGAttributes<SVGElement> {
  /**
   * Accessible label for screen readers. Defaults to "Loading...".
   * Use the standard aria-label prop for customization.
   */
  "aria-label"?: string;
}

/**
 * A reusable loading spinner component using the Loader2 icon from lucide-react.
 * Includes spinning animation and accessibility attributes. Defaults to size h-5 w-5
 * and text-primary color. Use className to override.
 *
 * @example
 * <Loader2 />
 * <Loader2 className="h-8 w-8 text-destructive" />
 * <Loader2 aria-label="Processing your request..." />
 */
const Loader2 = React.forwardRef<SVGSVGElement, Loader2Props>(
  ({ className, "aria-label": ariaLabel = "Loading...", ...props }, ref) => {
    return (
      <LucideLoader2
        ref={ref}
        // Apply default styles (spin animation, size, color) and merge with any provided className
        className={cn(
          "animate-spin h-5 w-5 text-primary", // Default styles
          className // Allows overriding defaults (e.g., "h-8 w-8 text-blue-500") and adding others (e.g., "mr-2")
        )}
        // Accessibility: Indicate this element represents a status update
        role="status"
        // Provide a text alternative for screen readers
        aria-label={ariaLabel}
        // Pass through any other valid SVG element props (like onClick, style, etc.)
        {...props}
      />
    );
  }
);

// Set a display name for easier debugging in React DevTools
Loader2.displayName = "Loader2";

// Export the component for use elsewhere
export { Loader2 };