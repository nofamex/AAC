// @ts-nocheck
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useState } from "react";
import { useScrollPosition } from "../hooks/useScrollPostion";
import Head from "next/head";

export default function Layout({ children }: any) {
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
    <>
      <Head>
        <title>AAC-2021</title>
      </Head>
      <Navbar scroll={scroll} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
