interface NumberProps {
  nums: number;
  selected?: boolean | null;
}

export default function Number({ nums, selected }: NumberProps) {
  return (
    <div
      className={`${
        selected ? "bg-orange" : "bg-black-60"
      } w-10 h-12 rounded-xl flex justify-center items-center font-bold text-xl cursor-pointer mr-2`}
    >
      {nums}
    </div>
  );
}
