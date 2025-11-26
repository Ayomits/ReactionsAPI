"use client";

import { dataTagErrorSymbol } from "@tanstack/react-query";
import { useGetAllPublicTags } from "./api/tags/use-get-all-public-tags";
import {
  TagCard,
  TagImage,
  TagName,
  TagRandomImageAction,
  TagStats,
} from "./components/tags";
import { getRandomArrVal } from "./lib/random";
import { timeFormat } from "./lib/format";
import { TextInput } from "./components/text-input";
import { ChangeEvent, useState } from "react";

export default function Home() {
  const tags = useGetAllPublicTags();

  const [input, setInput] = useState("");

  const filtred = tags.data?.data?.filter((t) => t.name.includes(input)) ?? [];

  return (
    <div className="max-w-342.5 flex justify-center flex-col gap-4 items-center mx-auto px-5">
      <h3 className="text-2xl">
        {tags.data?.data?.length ?? 0} тегов доступно!
      </h3>
      <div className="size-full flex flex-col gap-8">
        <TextInput
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
          className="w-full h-16"
        />

        <div className="w-full grid grid-cols-[repeat(auto-fit,20rem)] justify-center gap-x-4 gap-y-8">
          {filtred?.map?.((t, i) => {
            const medias = t.media.map((m) => m.url);
            return (
              <TagCard key={i}>
                <TagImage url={getRandomArrVal(medias)} />
                <TagName>{t.name}</TagName>
                <TagStats>
                  <span>Создан: {timeFormat(new Date(t.created_at))}</span>
                  <span>Обновлён: {timeFormat(new Date(t.updated_at))}</span>
                  <span>Медиа: {t.media.length + 1}</span>
                </TagStats>
                <TagRandomImageAction name={t.name} medias={medias} />
              </TagCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}
