import CompeDetails from "../../components/CompeDetails";
import Layout from "../../components/Layout";
import CompePrize from "../../components/CompePrize";
import TacTimeline from "../../components/TacTimeline";
import TacFAQ from "../../components/TacFAQ";
import CompetitionContact from "../../components/CompetitionContact";
import CompetitionFoot from "../../components/CompetitionFoot";

export default function TACHome() {
  return (
    <Layout>
      <div className="h-16 w-full bg-black-80"></div>
      <CompeDetails type="tac" />
      <CompePrize type="tac" />
      <TacTimeline />
      <TacFAQ />
      <CompetitionContact type="tac" />
      <CompetitionFoot type="tac" />
    </Layout>
  );
}
