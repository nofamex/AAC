import Image from "next/image";
import { useState } from "react";
import Button from "./Button";
import NavItem from "./NavItem";

interface NavbarDesktopProps {
  handler: Function;
  menus: string[];
}

export default function NavbarDesktop({ handler, menus }: NavbarDesktopProps) {
  const [selectedMenu, setSelectedMenu] = useState("Home");

  return (
    <>
      <Image src="/picture/logo.svg" alt="AAC Logo" width="80" height="58" />
      <div className="ml-auto h-16 hidden md:flex items-center">
        {menus.map((menu, index) => (
          <NavItem
            key={index}
            text={menu}
            handler={setSelectedMenu}
            current={selectedMenu}
          />
        ))}
        <Button text="Sign In" handler={() => handler()} filled={false} />
      </div>
    </>
  );
}
