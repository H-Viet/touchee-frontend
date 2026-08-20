import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s/g, "-");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {label && (
          <label
            htmlFor={inputId}
            style={{
              fontSize: "14px",
              fontWeight: 500,
              color: "var(--color-text-secondary)",
            }}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(className)}
          style={{
            height: "44px",
            width: "100%",
            borderRadius: "10px",
            padding: "0 16px",
            fontSize: "14px",
            outline: "none",
            boxSizing: "border-box",
            background: "rgba(34, 26, 44, 0.8)",
            border: error
              ? "1px solid rgba(248,113,113,0.6)"
              : "1px solid rgba(255,255,255,0.1)",
            color: "var(--color-text-primary)",
          }}
          onFocus={(e) => {
            e.target.style.border = error
              ? "1px solid rgba(248,113,113,0.8)"
              : "1px solid rgba(255, 61, 139, 0.6)";
            e.target.style.boxShadow = error
              ? "0 0 0 3px rgba(248,113,113,0.15)"
              : "0 0 0 3px rgba(255, 61, 139, 0.15)";
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            e.target.style.border = error
              ? "1px solid rgba(248,113,113,0.6)"
              : "1px solid rgba(255,255,255,0.1)";
            e.target.style.boxShadow = "none";
            props.onBlur?.(e);
          }}
          {...props}
        />
        {hint && !error && (
          <p style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>
            {hint}
          </p>
        )}
        {error && (
          <p style={{ fontSize: "12px", color: "var(--color-error)" }}>
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
export { Input };
