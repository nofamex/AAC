import CompePrize from "../../components/CompePrize";
import Layout from "../../components/Layout";
import CompeDetails from "../../components/CompeDetails";
import UnacTimeline from "../../components/UnacTimeline";
import UnacFAQ from "../../components/UnacFAQ";
import CompetitionContact from "../../components/CompetitionContact";
import CompetitionFoot from "../../components/CompetitionFoot";

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
