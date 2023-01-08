import Head from "next/head";
import MiniDrawer from "../components/Drawer";
import HomePage from "../components/home";

export default function Home() {
  return (
    <>
      <Head>
        <title>E-Commerce</title>
        <link rel="icon" href="/favicon.ico" />
        {/* <link rel="manifest" href="/manifest.json" /> */}
      </Head>
      <HomePage />
    </>
  );
}
