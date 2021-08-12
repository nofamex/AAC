interface FillBoxProps {
  num: number;
  difficulty: string;
}

export default function FillBox({ num, difficulty }: FillBoxProps) {
  return (
    <div className="w-full min-h-questionBox max-h-screen bg-compe rounded-xl flex mb-4">
      <div className="h-full w-1/12 flex flex-col items-center justify-start text-white font-bold p-4 text-xl">
        <p>No</p>
        <p>{num}</p>
      </div>
      <div className="h-full w-10/12 p-4 text-white">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius soluta
          consequatur{" "}
          <span>
            <input type="text" name="val1" />
          </span>{" "}
          qui suscipit et tenetur reprehenderit quo unde illo sapiente, at
          excepturi voluptates. Totam rem fugiat commodi consectetur est neque
          voluptatum quisquam eligendi unde enim hic nemo{" "}
          <span>
            <input type="text" name="val1" />
          </span>
          , suscipit pariatur. Est culpa necessitatibus sunt tempora alias
          asperiores, aliquid, molestiae facere esse ipsum maxime blanditiis
          perferendis non fugiat praesentium! Eum exercitationem ea inventore!
          <span>
            <input type="text" name="val1" />
          </span>
        </p>
      </div>
      <div className="h-full w-1/12 flex items-start justify-center text-white p-4">
        <p>{difficulty}</p>
      </div>
    </div>
  );
}
