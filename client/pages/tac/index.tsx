import CompeDetails from "@components/Competition/CompeDetails";
import Layout from "@components/Context/Layout";
import CompePrize from "@components/Competition/CompePrize";
import TacTimeline from "@components/TAC/TacTimeline";
import TacFAQ from "@components/TAC/TacFAQ";
import CompetitionContact from "@components/Competition/CompetitionContact";
import CompetitionFoot from "@components/Competition/CompetitionFoot";

export default function TACHome() {
  return (
    <Layout>
      <div className="h-16 w-full bg-black-80" />
      <CompeDetails type="tac" />
      <CompePrize type="tac" />
      <TacTimeline />
      <TacFAQ />
      <CompetitionContact type="tac" />
      <CompetitionFoot type="tac" />
    </Layout>
  );
}
