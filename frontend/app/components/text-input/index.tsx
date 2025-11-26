import { cn } from "@/app/lib/cn";
import { HTMLAttributes } from "react";

export function TextInput({
  className,
  ...props
}: HTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="text"
      className={cn(
        "bg-components-main shadow-md rounded-xl px-5 outline-none",
        className
      )}
      {...props}
    />
  );
}
