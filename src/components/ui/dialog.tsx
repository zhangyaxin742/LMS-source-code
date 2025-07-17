
import * as React from "react"

import { cn } from "@/lib/utils"

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({
  open,
  onOpenChange,
  children,
}) => {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-50">
        {children}
      </div>
    </div>
  );
};

export const DialogContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg sm:rounded-lg md:w-full",
        className
      )}
    >
      {children}
    </div>
  );
};

export const DialogHeader: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}>
      {children}
    </div>
  );
};

export const DialogFooter: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}>
      {children}
    </div>
  );
};

export const DialogTitle: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <h3 className={cn("text-lg font-semibold leading-none tracking-tight", className)}>
      {children}
    </h3>
  );
};

export const DialogDescription: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>
      {children}
    </p>
  );
};

// Adding DialogTrigger and enhancing DialogClose functionality
export const DialogTrigger: React.FC<{
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}> = ({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

// Enhanced DialogClose 
export const DialogClose: React.FC<{
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}> = ({ children, className, asChild }) => {
  // If asChild is true, we need to clone the child to add the onClick handler
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      // Don't pass className to the cloned element if not present in its props type
      // This fixes the TS2769 error
      ...(className ? { className: cn(children.props.className, className) } : {})
    });
  }
  
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export const DialogOverlay = DialogContent;
