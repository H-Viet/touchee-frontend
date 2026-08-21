import { cn } from "@/lib/utils";
import { type CSSProperties, type HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

const Card = ({ className, hover = false, style, ...props }: CardProps) => (
  <div
    className={cn(hover && "card-hoverable", className)}
    style={
      {
        borderRadius: "16px",
        padding: "20px",
        boxSizing: "border-box",
        background: "rgba(26, 21, 32, 0.6)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(12px)",
        transition: "all 0.2s ease",
        ...style,
      } as CSSProperties
    }
    {...props}
  />
);

const CardHeader = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex items-start justify-between gap-4", className)}
    style={{ marginBottom: "16px" }}
    {...props}
  />
);

const CardBody = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn(className)} {...props} />
);

const CardFooter = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex items-center gap-3", className)}
    style={{
      marginTop: "16px",
      paddingTop: "16px",
      borderTop: "1px solid rgba(255,255,255,0.06)",
    }}
    {...props}
  />
);

export { Card, CardHeader, CardBody, CardFooter };
