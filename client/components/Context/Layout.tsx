// @ts-nocheck
import Footer from "@components/Context/Footer";
import Navbar from "@components/Context/Nav/Navbar";
import { useScrollPosition } from "@hooks/useScrollPostion";
import { useState } from "react";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <main>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {children}
      </main>
      <Footer />
    </>
  );
}
