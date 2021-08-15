interface NumberProps {
  nums: number;
  selected?: boolean | null;
  page: number;
}

export default function Number({ nums, selected, page }: NumberProps) {
  return (
    <div
      className={`${
        selected ? "bg-orange" : "bg-black-60"
      } w-10 h-12 rounded-xl flex justify-center items-center font-bold text-xl cursor-pointer mr-2 ${
        page > nums && "bg-opacity-20"
      }`}
    >
      {nums}
    </div>
  );
}
