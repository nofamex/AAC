/* eslint-disable @next/next/link-passhref */
import Link from "next/link";
import { useRouter } from "next/router";

interface NavItemProps {
  text: string;

  page: string;
}

export default function NavItem({ text, page }: NavItemProps) {
  const router = useRouter();
  return (
    <div
      className={`font-dm ${
        router.pathname === page
          ? "text-orange font-bold opacity-100"
          : "text-white opacity-75"
      } h-full w-16 flex items-center mr-10 p-1 cursor-pointer justify-center hover:opacity-100`}
    >
      <Link href={page}>
        <p
          className={`${
            router.pathname === page && "border-b-2 border-orange"
          }`}
        >
          {text}
        </p>
      </Link>
    </div>
  );
}
