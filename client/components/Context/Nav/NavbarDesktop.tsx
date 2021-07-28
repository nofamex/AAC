/* eslint-disable @next/next/link-passhref */
import Button from "@components/Context/Button";
import NavItem from "@components/Context/Nav/NavItem";
import { isAuthenticated } from "@lib/auth";
import Image from "next/image";
import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";
import { useRouter } from "next/router";

interface NavbarDesktopProps {
  handler: Function;
  menus: { page: string; text: string }[];
}

export default function NavbarDesktop({ handler, menus }: NavbarDesktopProps) {
  const router = useRouter();
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
        {isAuthenticated() ? (
          <FaRegUserCircle
            className="text-orange text-3xl cursor-pointer"
            onClick={() => router.push("/dashboard")}
          />
        ) : (
          <Button text="Sign In" handler={() => handler()} filled={false} />
        )}
      </div>
    </>
  );
}
