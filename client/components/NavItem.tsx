interface NavItemProps {
  text: string;
  handler: Function;
  current: string;
}

export default function NavItem({ text, handler, current }: NavItemProps) {
  return (
    <div
      className={`font-dm ${
        current === text
          ? "text-orange font-bold opacity-100"
          : "text-white opacity-75"
      } h-full w-16 flex items-center mr-10 p-1 cursor-pointer justify-center hover:opacity-100`}
      onClick={() => handler(text)}
    >
      <p className={`${current === text && "border-b-2 border-orange"}`}>
        {text}
      </p>
    </div>
  );
}
