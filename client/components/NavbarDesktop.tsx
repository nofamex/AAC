import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import NavItem from "./NavItem";

interface NavbarDesktopProps {
  handler: Function;
  menus: { page: string; text: string }[];
}

export default function NavbarDesktop({ handler, menus }: NavbarDesktopProps) {
  return (
    <>
      <Link href="/">
        <Image
          src="/picture/logo.svg"
          alt="AAC Logo"
          width="80"
          height="58"
          className="cursor-pointer"
        />
      </Link>
      <div className="ml-auto h-16 hidden md:flex items-center">
        {menus.map((menu, index) => (
          <NavItem key={index} text={menu.text} page={menu.page} />
        ))}
        <Button text="Sign In" handler={() => handler()} filled={false} />
      </div>
    </>
  );
}
