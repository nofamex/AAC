interface QustionBoxProps {
  num: number;
  difficulty: string;
}

export default function QuestionBox({ num, difficulty }: QustionBoxProps) {
  return (
    <div className="w-full min-h-questionBox max-h-screen bg-compe rounded-xl flex mb-4">
      <div className="h-full w-1/12 flex flex-col items-center justify-start text-white font-bold p-4 text-xl">
        <p>No</p>
        <p>{num}</p>
      </div>
      <div className="h-full w-10/12 p-4 text-white">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil,
          aliquid iste obcaecati beatae earum libero quisquam? Distinctio,
          cumque qui provident quod deleniti rerum odit fugiat, fugit, esse
          deserunt ex id dolorum maxime! Cupiditate quia voluptas, beatae quod
          recusandae, accusamus corporis quasi in veniam repellendus, placeat
          illum? Cum, nam deserunt.
        </p>
        <div className="w-full auto flex flex-col mt-4">
          {options.map((o, i) => (
            <Option name={o.name} value={o.value} text={o.text} key={i} />
          ))}
        </div>
      </div>
      <div className="h-full w-1/12 flex items-start justify-center text-white p-4">
        <p>{difficulty}</p>
      </div>
    </div>
  );
}

interface OptionProps {
  name: string;
  value: string;
  text: string;
}

function Option({ name, value, text }: OptionProps) {
  return (
    <div>
      <input type="radio" name={name} value={value} />
      <label htmlFor="opsi1" className="text-red-default text-lg order-2 ml-3">
        {text}
      </label>
    </div>
  );
}

const options = [
  { name: "opsi1", value: "opsi1", text: "opsi1" },
  { name: "opsi2", value: "opsi2", text: "opsi2" },
  { name: "opsi3", value: "opsi3", text: "opsi3" },
  { name: "opsi4", value: "opsi4", text: "opsi4" },
];
