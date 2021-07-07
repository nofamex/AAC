import CompeDetails from "../../components/CompeDetails";
import Layout from "../../components/Layout";
import CompePrize from "../../components/CompePrize";

export default function TACHome() {
  return (
    <Layout>
      <div className="h-16 w-full bg-black-80"></div>
      <CompeDetails type="tac" />
      <CompePrize type="tac" />
    </Layout>
  );
}
