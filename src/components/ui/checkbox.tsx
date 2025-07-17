
import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onCheckedChange?: (checked: boolean) => void
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, onCheckedChange, ...props }, ref) => {
    const [checked, setChecked] = React.useState(props.checked || false)

    React.useEffect(() => {
      if (props.checked !== undefined) {
        setChecked(props.checked)
      }
    }, [props.checked])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (props.onChange) {
        props.onChange(e)
      }
      if (onCheckedChange) {
        onCheckedChange(e.target.checked)
      }
      if (props.checked === undefined) {
        // Only update internal state if it's an uncontrolled component
        setChecked(e.target.checked)
      }
    }

    return (
      <div className="relative flex items-center">
        <input
          type="checkbox"
          ref={ref}
          className="peer absolute h-4 w-4 cursor-pointer opacity-0"
          checked={checked}
          onChange={handleChange}
          {...props}
        />
        <div
          className={cn(
            "flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-primary ring-offset-background transition-colors",
            "peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2",
            "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
            checked ? "bg-primary text-primary-foreground" : "",
            className
          )}
        >
          {checked && <Check className="h-3 w-3" />}
        </div>
      </div>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
