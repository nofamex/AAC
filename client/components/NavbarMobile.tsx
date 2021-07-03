import Link from "next/link";
import Button from "./Button";
import { fallDown as Menu } from "react-burger-menu";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircle } from "react-icons/io";
import tw from "tailwind-styled-components";

interface NavbarMobileProps {
  handler: Function;
  menus: string[];
}

export default function NavbarMobile({ handler, menus }: NavbarMobileProps) {
  const NavMenuMobile = tw.p`mb-4 cursor-pointer text-center opacity-75 hover:opacity-100`;

  return (
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
        {menus.map((menu, index) => (
          <Link href="" key={index}>
            <NavMenuMobile>{menu}</NavMenuMobile>
          </Link>
        ))}
        <Button text="Sign In" handler={() => handler()} filled={false} />
      </Menu>
    </div>
  );
}
