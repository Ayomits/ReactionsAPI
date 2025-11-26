"use client";

import { DialogTitle } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogTrigger } from "../dialog";
import { Button } from "../button";
import Image from "next/image";
import { ApiMethod } from "../api";
import { getRandomArrVal } from "@/app/lib/random";
import { PlaceholderImage } from "@/app/config/imgs";

export function TagRandomImageAction({
  name,
  medias,
}: {
  name: string;
  medias: string[];
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Случайное медиа</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-xl">Медиа номер 1</DialogTitle>
        <ul>
          <li>
            <ApiMethod variant="get" /> /api/v1/tags/{name}
          </li>
        </ul>
        <Image
          width={400}
          height={400}
          src={getRandomArrVal(medias) ?? PlaceholderImage}
          alt="Smoke media"
          className="object-cover size-100 rounded-sm"
        />
      </DialogContent>
    </Dialog>
  );
}
