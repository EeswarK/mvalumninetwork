import { NavBar } from "@/components/ui/NavBar";
import { type NextPage } from "next";
import Head from "next/head";
import Landing from "./Landing/Landing";

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
        <h1 className="text-5xl font-bold tracking-tight text-zinc-900 sm:text-[5rem]">
          Join <span className="text-violet-700">MV</span> Network
        </h1>
      </main>
    </>
  );
};

export default Home;
