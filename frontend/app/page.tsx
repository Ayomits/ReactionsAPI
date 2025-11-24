import Image from "next/image";
import {
  TagAction,
  TagCard,
  TagImage,
  TagName,
  TagStats,
} from "./components/tags/card";

export default function Home() {
  return (
    <div className="max-w-342.5 flex justify-center flex-col gap-4 items-center mx-auto">
      <h3 className="text-2xl">Более 80 тегов</h3>
      <div className="size-full flex flex-col gap-8">
        <input
          type="text"
          className="w-full h-16 bg-components-main shadow-md rounded-xl px-5 active:border-none hover:border-none foucs:border-none outline-none"
          placeholder="Поиск по тегам"
        />

        {/* Карточка */}
        <div className="w-full grid grid-cols-[repeat(auto-fit,20rem)] justify-center gap-x-4 gap-y-8">
          {new Array(40).fill(null).map((_, i) => (
            <TagCard key={i}>
              <TagImage url="https://i.pinimg.com/originals/29/92/fb/2992fb9c44cdc817e6cbc0782fbc6276.gif" />
              <TagName>Smoke</TagName>
              <TagStats>
                <span>Создан: 12.11.2024</span>
                <span>Создан: 12.11.2024</span>
                <span>Создан: 12.11.2024</span>
              </TagStats>
              <TagAction>Edit</TagAction>
            </TagCard>
          ))}
        </div>
      </div>
    </div>
  );
}
