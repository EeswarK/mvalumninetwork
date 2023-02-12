import { NavBar } from "@/components/ui/NavBar";
import { type NextPage } from "next";
import Head from "next/head";
import Landing from "../components/Landing/Landing";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>MV Network</title>
        <meta
          name="description"
          content="Connect with your Monta Vista Network"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main>
        <Landing />
      </main>
    </>
  );
};

export default Home;
