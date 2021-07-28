// @ts-nocheck
import HeaderVideo from "@components/Landing/HeaderVideo";
import Layout from "@components/Context/Layout";
import HeaderMobile from "@components/Landing/HeaderMobile";
import Event from "@components/Landing/Event";
import Timeline from "@components/Landing/Timeline";
import ContactUs from "@components/Landing/ContactUs";
import { useScrollPosition } from "@hooks/useScrollPostion";
import { useState } from "react";

export default function Home() {
  const [scroll, setScroll] = useState(false);

  useScrollPosition(
    ({ currPos }: any) => {
      const isShow = currPos.y < 0;

      if (isShow !== scroll) setScroll(isShow);
      else setScroll(isShow);
    },
    [scroll]
  );

  return (
    <Layout>
      <HeaderVideo scroll={scroll} />
      <HeaderMobile />
      <Event />
      <Timeline />
      <ContactUs />
    </Layout>
  );
}
