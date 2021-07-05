// @ts-nocheck
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useState } from "react";
import { useScrollPosition } from "../hooks/useScrollPostion";

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
      <Navbar scroll={scroll} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
