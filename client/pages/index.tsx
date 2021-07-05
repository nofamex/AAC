// @ts-nocheck
import HeaderVideo from "../components/HeaderVideo";
import Layout from "../components/Layout";
import { useState } from "react";
import { useScrollPosition } from "../hooks/useScrollPostion";
import HeaderMobile from "../components/HeaderMobile";

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
    </Layout>
  );
}
