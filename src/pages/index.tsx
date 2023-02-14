import { NavBar } from "@/components/ui/NavBar";
import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session && context.req.url === "/") {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
