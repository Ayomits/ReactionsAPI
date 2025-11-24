import { cn } from "@/app/lib/cn";
import NextLink, { LinkProps } from "next/link";
import { HTMLAttributes } from "react";

export function Link({
  className,
  ...props
}: LinkProps & HTMLAttributes<HTMLAnchorElement>) {
  return (
    <NextLink
      className={cn("hover:opacity-95 transition-all duration-300", className)}
      {...props}
    />
  );
}
