/* eslint-disable @next/next/link-passhref */
import { isAuthenticated } from "@lib/auth";
import Link from "next/link";
import { fallDown as Menu } from "react-burger-menu";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircle } from "react-icons/io";
import tw from "tailwind-styled-components";
import { FaRegUserCircle } from "react-icons/fa";
import { useRouter } from "next/router";

interface NavbarMobileProps {
  menus: { page: string; text: string }[];
}

export default function NavbarMobile({ menus }: NavbarMobileProps) {
  const NavMenuMobile = tw.p`mb-4 cursor-pointer text-center opacity-75 hover:opacity-100`;

  const router = useRouter();

  return (
    <div className="w-full flex md:hidden justify-end z-0">
      <Menu
        customBurgerIcon={<GiHamburgerMenu className="text-white" />}
        customCrossIcon={<IoMdCloseCircle className="text-white" />}
        burgerButtonClassName="w-7 h-7 block md:hidden"
        menuClassName="bg-black-80 text-white p-4"
        itemListClassName="mt-14 p-2 font-dm flex flex-col text-lg"
        className={`top-0 z-10`}
        width={"100%"}
        right
        noOverlay
      >
        {menus.map((menu, index) => (
          <Link href={menu.page} key={index}>
            <NavMenuMobile>{menu.text}</NavMenuMobile>
          </Link>
        ))}
        {isAuthenticated() ? (
          <div>
            <div className="flex justify-center">
              <FaRegUserCircle
                className="text-orange text-3xl cursor-pointer mr-0"
                onClick={() => router.push("/dashboard")}
              />
            </div>
          </div>
        ) : (
          <Link href={"/signin"}>
            <NavMenuMobile>Sign In</NavMenuMobile>
          </Link>
        )}
      </Menu>
    </div>
  );
}
