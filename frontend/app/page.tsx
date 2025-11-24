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

export default function Home() {
  const tags = useGetAllPublicTags();

  return (
    <div className="max-w-342.5 flex justify-center flex-col gap-4 items-center mx-auto">
      <h3 className="text-2xl">
        {tags.data?.data?.length ?? 0} тегов доступно!
      </h3>
      <div className="size-full flex flex-col gap-8">
        <input
          type="text"
          className="w-full h-16 bg-components-main shadow-md rounded-xl px-5 active:border-none hover:border-none foucs:border-none outline-none"
          placeholder="Поиск по тегам"
        />

        {/* Карточка */}
        <div className="w-full grid grid-cols-[repeat(auto-fit,20rem)] justify-center gap-x-4 gap-y-8">
          {tags.data?.data?.map?.((t, i) => {
            const medias = t.media.map((m) => m.url);
            return (
              <TagCard key={i}>
                <TagImage url={getRandomArrVal(medias)} />
                <TagName>{t.name}</TagName>
                <TagStats>
                  <span>Создан: 12.11.2024</span>
                  <span>Создан: 12.11.2024</span>
                  <span>Создан: 12.11.2024</span>
                </TagStats>
                <TagRandomImageAction medias={medias} />
              </TagCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}
