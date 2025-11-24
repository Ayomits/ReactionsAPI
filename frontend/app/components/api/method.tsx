import { cn } from "@/app/lib/cn";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

const apiMethodVariants = cva("p-2 rounded-sm select-none text-white", {
  variants: {
    variant: {
      get: "bg-blue-500",
      post: "bg-green-500",
      put: "bg-orange-500",
      delete: "bg-red-500",
    },
  },
  defaultVariants: {
    variant: "get",
  },
});

export function ApiMethod({
  className,
  variant,
  ...props
}: VariantProps<typeof apiMethodVariants> &
  Omit<HTMLAttributes<HTMLDivElement>, "children">) {
  return (
    <span className={cn(apiMethodVariants({ variant }), className)} {...props}>
      {variant?.toUpperCase()}
    </span>
  );
}
