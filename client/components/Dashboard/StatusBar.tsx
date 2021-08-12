interface StatusBarProps {
  text: string;
  type: string;
}

export default function StatusBar({ text, type }: StatusBarProps) {
  return (
    <div
      className={`h-6 w-auto ${
        type === "berhasil"
          ? "bg-success"
          : type === "ditolak"
          ? "bg-error"
          : "bg-orange"
      } p-4 flex items-center rounded-button text-xs sm:text-base font-normal`}
    >
      {text}
    </div>
  );
}
