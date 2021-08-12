interface NumberProps {
  nums: number;
}

export default function Number({ nums }: NumberProps) {
  return (
    <div className="bg-black-60 w-10 h-12 rounded-xl flex justify-center items-center font-bold text-xl cursor-pointer mr-2">
      {nums}
    </div>
  );
}
