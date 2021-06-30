interface NavItemProps {
  text: string;
  handler: Function;
  current: string;
}

export default function NavItem({ text, handler, current }: NavItemProps) {
  return (
    <div
      className={`font-norms ${
        current === text ? "text-orange font-bold" : "text-white"
      } h-full w-16 flex items-center mr-10 p-1 cursor-pointer justify-center`}
      onClick={() => handler(text)}
    >
      <p className={`${current === text && "border-b-2 border-orange"}`}>
        {text}
      </p>
    </div>
  );
}
