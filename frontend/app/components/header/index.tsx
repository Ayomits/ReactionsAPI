"use client";

import { ApiDocLink, DiscordServerLink, TgcLink } from "@/app/config/links";
import Image from "next/image";
import { Fragment, useState } from "react";
import { Link } from "../link";
import { Button } from "../button";

export function Header() {
  return (
    <header className="bg-components-main shadow-md h-25 w-full flex sticky top-0">
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between px-6 xl:px-0">
        <h1 className="text-[2rem]">RA</h1>
        <nav className="flex items-center gap-6">
          <Link
            className="hover:opacity-95 transition-all duration-300"
            href={ApiDocLink}
          >
            API
          </Link>
          <Link
            className="hover:opacity-95 transition-all duration-300"
            href={TgcLink}
          >
            TELEGRAM
          </Link>
          <Link
            className="hover:opacity-95 transition-all duration-300"
            href={DiscordServerLink}
          >
            DISCORD
          </Link>
        </nav>
        <HeaderProfile />
      </div>
    </header>
  );
}

export function HeaderProfile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  return <Fragment />;
}
