import { useState } from "react";
import Image from "next/image";
import Button from "./Button";
import NavItem from "./NavItem";

export default function Navbar() {
  const [selectedMenu, setSelectedMenu] = useState("Home");

  const menus = ["Home", "Competition", "Seminar"];

  const signInHandler = () => {
    console.log("clicked");
  };

  return (
    <div className="h-16 bg-black-80 flex items-center px-nav">
      <Image src="/picture/logo.svg" alt="AAC Logo" width="80" height="58" />
      <div className="ml-auto h-16 flex items-center">
        {menus.map((menu, index) => (
          <NavItem
            key={index}
            text={menu}
            handler={setSelectedMenu}
            current={selectedMenu}
          />
        ))}
        <Button text="Sign In" handler={signInHandler} filled={false} />
      </div>
    </div>
  );
}
