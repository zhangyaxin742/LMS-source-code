
import * as React from "react"
import { Check, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: { value: string; label: string }[]
  onValueChange?: (value: string) => void
}

// Custom SelectContent, SelectItem, SelectTrigger, and SelectValue components for compatibility
export const SelectContent = ({children, className}: {children: React.ReactNode, className?: string}) => children;

export const SelectItem = ({value, children, id, className}: {
  value: string, 
  children: React.ReactNode, 
  id?: string,
  className?: string
}) => (
  <option value={value} id={id} className={className}>{children}</option>
);

export const SelectTrigger = ({
  children, 
  className, 
  id
}: {
  children: React.ReactNode, 
  className?: string,
  id?: string
}) => children;

export const SelectValue = ({
  placeholder, 
  id, 
  className
}: {
  placeholder?: string, 
  id?: string,
  className?: string
}) => placeholder || null;

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options = [], onValueChange, onChange, value, children, ...props }, ref) => {
    // Extract options from children if they exist and options prop is not provided
    const extractedOptions = React.useMemo(() => {
      if (options && options.length > 0) return options;
      
      const items: { value: string; label: string }[] = [];
      
      if (children) {
        // Extract options from SelectItem children
        React.Children.forEach(children, (child) => {
          if (React.isValidElement(child) && child.type === SelectItem) {
            items.push({
              value: child.props.value,
              label: child.props.children?.toString() || child.props.value
            });
          }
        });
      }
      
      return items;
    }, [children, options]);

    // Handle both onChange and onValueChange
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (onChange) {
        onChange(e);
      }
      if (onValueChange) {
        onValueChange(e.target.value);
      }
    };

    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          value={value}
          onChange={handleChange}
          {...props}
        >
          {children || extractedOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-3 h-4 w-4 opacity-50 pointer-events-none" />
      </div>
    )
  }
)
Select.displayName = "Select"

export { Select }
