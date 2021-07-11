import Button from "./Button";

interface DangerModalProps {
  submit: Function;
  closeHandler: Function;
}

export default function DangerModal({
  submit,
  closeHandler,
}: DangerModalProps) {
  return (
    <div className="h-screen w-full absolute bg-black-80 opacity-90 flex flex-col items-center justify-center">
      <div className="h-40 w-1/2 bg-black-80 border-2 border-red-600 rounded-xl flex flex-col">
        <div className="w-full h-full font-dm text-red-600 flex justify-center items-center text-2xl text-center">
          Pastikan data registrasi sudah benar. Data tidak bisa diubah lagi
          setelah registrasi selesai
        </div>
      </div>
      <div className="h-10 w-1/2 flex justify-end p-4">
        <div className="mr-4">
          <Button text="Tutup" handler={closeHandler} filled={false} />
        </div>
        <div>
          <Button text="Submit" handler={submit} filled={true} />
        </div>
      </div>
    </div>
  );
}
