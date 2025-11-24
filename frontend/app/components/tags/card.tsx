import Image from "next/image";
import { ButtonHTMLAttributes, HTMLAttributes } from "react";
import { Button, ButtonProps } from "../button";
import { PlaceholderImage } from "@/app/config/imgs";

type TagCardProps = {
  name: string;
  created_at: Date | string;
  updated_at: Date | string;
  image: string;
};

export function TagCard({ ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="w-80 h-96 bg-components-main rounded-xl p-4 flex flex-col gap-4 shadow-md"
      {...props}
    />
  );
}

export function TagImage({ url }: { url: string }) {
  return (
    <Image
      width={276}
      height={128}
      src={url ?? PlaceholderImage}
      alt="Первая гифка"
      className="rounded-sm w-69 h-32 object-cover"
      unoptimized
    />
  );
}

export function TagName({ ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className="text-center" {...props} />;
}

export function TagStats({ ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className="flex flex-col" {...props} />;
}

export function TagAction({ ...props }: ButtonProps) {
  return <Button className="bg-primary rounded-xl" {...props} />;
}
