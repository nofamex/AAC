import Layout from "@components/Context/Layout";
import WebinarLanding from "@components/Webinar/WebinarLanding";
import WebinarSpeaker from "@components/Webinar/Speaker";
import WebinarModerator from "@components/Webinar/Moderator";
import WebinarFoot from "@components/Webinar/WebinarFoot";

export default function Webinar() {
  return (
    <Layout>
      <div className="h-16 w-full bg-black-80 z-0" />
      <WebinarLanding />
      <WebinarSpeaker />
      <WebinarModerator />
      <WebinarFoot />
    </Layout>
  );
}
