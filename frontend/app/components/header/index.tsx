"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function Header() {
  return (
    <header className="bg-components-main shadow-md h-25 w-full flex sticky top-0">
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between ">
        <h1 className="text-[2rem]">RA</h1>
        <nav className="flex items-center gap-6">
          <Link href="/">API</Link>
          <Link href="/">TELEGRAM</Link>
          <Link href="/">DISCORD</Link>
        </nav>
        <HeaderProfile />
      </div>
    </header>
  );
}

export function HeaderProfile() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  if (isLoggedIn) {
    return (
      <Image
        src="https://i.pinimg.com/736x/a2/84/40/a284403a6caee232dfca60e32977d6d1.jpg"
        alt="User avatar"
        width={48}
        height={48}
        className="rounded-full size-12 object-cover"
      />
    );
  }

  return <button>Войти</button>;
}
