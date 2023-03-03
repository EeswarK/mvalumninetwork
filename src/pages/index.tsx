import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Landing from "../components/screens/landing/Landing";

const Main: NextPage = () => {
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
      <main>
        <Landing />
      </main>
    </>
  );
};

export default Main;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: true,
  //     },
  //   };
  // } else if (session.user.role) {
  //   return {
  //     redirect: {
  //       destination: "/home",
  //       permanent: false,
  //     },
  //   };
  // } else {
  return {
    props: {},
  };
  // }
};
