import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import NavItem from "./NavItem";
import { fallDown as Menu } from "react-burger-menu";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircle } from "react-icons/io";
import tw from "tailwind-styled-components";

export default function Navbar() {
  const NavMenuMobile = tw.p`mb-4 cursor-pointer text-center opacity-75 hover:opacity-100`;

  const [selectedMenu, setSelectedMenu] = useState("Home");

  const menus = ["Home", "Competition", "Seminar"];

  const signInHandler = () => {
    console.log("clicked");
  };

  return (
    <div className="h-16 bg-black-80 flex items-center px-6 md:px-nav w-full">
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
      <div className="w-full flex md:hidden justify-end ">
        <Menu
          customBurgerIcon={<GiHamburgerMenu className="text-white" />}
          customCrossIcon={<IoMdCloseCircle className="text-white" />}
          burgerButtonClassName="w-7 h-7 block md:hidden"
          menuClassName="bg-black-80 text-white p-4"
          itemListClassName="mt-14 p-2 font-dm flex flex-col text-lg"
          className="top-0 z-50"
          width={"100%"}
          right
          noOverlay
        >
          <Link href="">
            <NavMenuMobile>Home</NavMenuMobile>
          </Link>
          <Link href="">
            <NavMenuMobile>Competition</NavMenuMobile>
          </Link>
          <Link href="">
            <NavMenuMobile>Seminar</NavMenuMobile>
          </Link>
          <Button text="Sign In" handler={signInHandler} filled={false} />
        </Menu>
      </div>
    </div>
  );
}
