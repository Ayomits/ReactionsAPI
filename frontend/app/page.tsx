import Image from "next/image";

export default function Home() {
  return (
    <div className="max-w-360 flex justify-center flex-col gap-4 items-center mx-auto">
      <h3 className="text-2xl">Более 80 тегов</h3>
      <div className="size-full flex flex-col gap-8">
        <input
          type="text"
          className="w-full h-16 bg-components-main shadow-md rounded-xl px-5 active:border-none hover:border-none foucs:border-none outline-none"
          placeholder="Поиск по тегам"
        />

        {/* Карточка */}
        <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-x-4 gap-y-8">
          {new Array(40).fill(null).map((_, i) => (
            <TagCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TagCard() {
  return (
    <div className="w-80 h-90 bg-components-main rounded-xl p-4 flex flex-col gap-4 shadow-md">
      <div>
        <Image
          width={276}
          height={128}
          src="https://i.pinimg.com/originals/29/92/fb/2992fb9c44cdc817e6cbc0782fbc6276.gif"
          alt="Первая гифка"
          className="rounded-sm"
          unoptimized
        />
      </div>
      <h3 className="text-center">Smoke</h3>
      <div className="flex flex-col">
        <span>Гифок: 23</span>
        <span>Создан: 21.12.24</span>
        <span>Обновлён: 21.12.25</span>
      </div>
      <button className="h-12.5 w-full bg-primary rounded-xl cursor-pointer">
        Случайная гифка
      </button>
    </div>
  );
}
