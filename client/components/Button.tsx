interface ButtonProps {
  text: string;
  handler: Function;
  filled: boolean;
}

export default function Button({ text, handler, filled }: ButtonProps) {
  return (
    <button
      className={`border-2 border-orange ${
        filled ? "bg-orange text-white" : "text-orange"
      } rounded-button px-5 py-1 font-norms font-bold`}
      onClick={() => handler()}
    >
      {text}
    </button>
  );
}
