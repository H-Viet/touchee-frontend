import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

const Card = ({ className, hover = false, ...props }: CardProps) => (
  <div
    className={cn(
      "rounded-[var(--radius-xl)] p-6 transition-all duration-200",
      hover && "cursor-pointer",
      className,
    )}
    style={{
      background: "rgba(26, 21, 32, 0.8)",
      border: "1px solid rgba(255, 61, 139, 0.15)",
      backdropFilter: "blur(12px)",
      boxShadow: hover
        ? undefined
        : "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
    }}
    {...props}
  />
);

const CardHeader = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mb-4 flex items-start justify-between gap-4", className)}
    {...props}
  />
);

const CardBody = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("", className)} {...props} />
);

const CardFooter = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-4 flex items-center gap-3 pt-4", className)}
    style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    {...props}
  />
);

export { Card, CardHeader, CardBody, CardFooter };
