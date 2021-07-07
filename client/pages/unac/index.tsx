import CompePrize from "../../components/CompePrize";
import Layout from "../../components/Layout";
import CompeDetails from "../../components/CompeDetails";

export default function UNACHome() {
  return (
    <Layout>
      <div className="h-16 w-full bg-black-80"></div>
      <CompeDetails type="unac" />
      <CompePrize type="unac" />
    </Layout>
  );
}
