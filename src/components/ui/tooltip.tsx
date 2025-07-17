
import * as React from "react"
import { cn } from "@/lib/utils"

export interface TooltipProps {
  content: React.ReactNode
  children: React.ReactNode
  side?: "top" | "right" | "bottom" | "left"
  className?: string
  delayDuration?: number
  asChild?: boolean
}

// Add the missing components for compatibility
export const TooltipContent: React.FC<{
  children: React.ReactNode;
  side?: string;
  align?: string;
  hidden?: boolean;
  className?: string;
  id?: string;
}> = ({children, side, align, hidden, className, id}) => {
  if (hidden) return null;
  return <div id={id} className={cn("px-3 py-1.5 text-sm bg-popover text-popover-foreground rounded-md shadow-md", className)}>{children}</div>;
};

export const TooltipProvider: React.FC<{
  children: React.ReactNode;
  delayDuration?: number;
}> = ({children}) => children;

export const TooltipTrigger: React.FC<{
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
}> = ({children, className}) => <span className={className}>{children}</span>;

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  side = "top",
  className,
  delayDuration = 300,
  asChild = false,
}) => {
  const [isVisible, setIsVisible] = React.useState(false)
  const [position, setPosition] = React.useState({ top: 0, left: 0 })
  const childRef = React.useRef<HTMLDivElement>(null)
  const tooltipRef = React.useRef<HTMLDivElement>(null)
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  const calculatePosition = React.useCallback(() => {
    if (!childRef.current || !tooltipRef.current) return
    
    const childRect = childRef.current.getBoundingClientRect()
    const tooltipRect = tooltipRef.current.getBoundingClientRect()
    
    const gap = 8 // gap between tooltip and trigger
    
    let top = 0
    let left = 0
    
    switch (side) {
      case "top":
        top = childRect.top - tooltipRect.height - gap
        left = childRect.left + (childRect.width - tooltipRect.width) / 2
        break
      case "bottom":
        top = childRect.bottom + gap
        left = childRect.left + (childRect.width - tooltipRect.width) / 2
        break
      case "left":
        top = childRect.top + (childRect.height - tooltipRect.height) / 2
        left = childRect.left - tooltipRect.width - gap
        break
      case "right":
        top = childRect.top + (childRect.height - tooltipRect.height) / 2
        left = childRect.right + gap
        break
    }
    
    setPosition({ top, left })
  }, [side])

  const showTooltip = React.useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      calculatePosition();
    }, delayDuration);
  }, [calculatePosition, delayDuration]);

  const hideTooltip = React.useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
  }, []);

  React.useEffect(() => {
    if (isVisible) {
      calculatePosition()
      // Recalculate on window resize
      window.addEventListener("resize", calculatePosition)
      // Cleanup
      return () => window.removeEventListener("resize", calculatePosition)
    }
  }, [isVisible, calculatePosition])

  // When component unmounts, clear any remaining timeouts
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const childElement = asChild 
    ? React.cloneElement(children as React.ReactElement, {
        ref: childRef,
        onMouseEnter: showTooltip,
        onMouseLeave: hideTooltip,
        onFocus: showTooltip,
        onBlur: hideTooltip,
      })
    : (
      <div
        ref={childRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        className="inline-block"
      >
        {children}
      </div>
    );

  return (
    <>
      {childElement}
      {isVisible && (
        <div
          ref={tooltipRef}
          style={{
            position: "fixed",
            top: `${position.top}px`,
            left: `${position.left}px`,
            zIndex: 50,
          }}
          className={cn(
            "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
            className
          )}
        >
          {content}
        </div>
      )}
    </>
  );
};

export { Tooltip };
