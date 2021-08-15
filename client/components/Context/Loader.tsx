import ReactLoader from "react-loading";

interface LoaderProps {
  height: string;
}

export default function Loader({ height }: LoaderProps) {
  return (
    <div
      className={`w-full bg-black-80 flex justify-center items-center ${height}`}
    >
      <ReactLoader
        color="#FDA305"
        className="text-orange"
        type="cylon"
        width={200}
        height={200}
      />
    </div>
  );
}
