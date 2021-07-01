import { useState } from "react";
import Image from "next/image";
import Button from "./Button";
import NavItem from "./NavItem";
import { slide as Menu } from "react-burger-menu";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Navbar() {
  const [selectedMenu, setSelectedMenu] = useState("Home");

  const menus = ["Home", "Competition", "Seminar"];

  const signInHandler = () => {
    console.log("clicked");
  };

  return (
    <div className="h-16 bg-black-80 flex items-center px-6 md:px-nav">
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
        <Button text="Sign In" handler={signInHandler} filled={false} />
      </div>
      <div className="ml-auto md:ml-0">
        <Menu
          customBurgerIcon={<GiHamburgerMenu className="text-white" />}
          burgerButtonClassName="w-7 h-7 block md:hidden"
        >
          <a href="">Home</a>
          <a href="">Competition</a>
          <a href="">Seminar</a>
        </Menu>
      </div>
    </div>
  );
}
