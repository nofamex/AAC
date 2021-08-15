import CompePrize from "@components/Competition/CompePrize";
import Layout from "@components/Context/Layout";
import CompeDetails from "@components/Competition/CompeDetails";
import UnacTimeline from "@components/UNAC/UnacTimeline";
import UnacFAQ from "@components/UNAC/UnacFAQ";
import CompetitionContact from "@components/Competition/CompetitionContact";
import CompetitionFoot from "@components/Competition/CompetitionFoot";

export default function UNACHome() {
  return (
    <Layout>
      <div className="h-16 w-full bg-black-80 z-0"></div>
      <CompeDetails type="unac" />
      <CompePrize type="unac" />
      <UnacTimeline />
      <UnacFAQ />
      <CompetitionContact type="unac" />
      <CompetitionFoot type="unac" />
    </Layout>
  );
}
