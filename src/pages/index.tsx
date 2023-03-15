import CurrentSessionInfo from "@/components/CurrentSessioninfo";
import Hero from "@/components/screens/landing/Hero";
import PrimaryFeatures from "@/components/screens/landing/PrimaryFeatures";
import SecondaryFeatures from "@/components/screens/landing/SecondaryFeatures";
import type { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";

const Main: NextPage = () => {
  const session = useSession();

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
        <Hero />
        <PrimaryFeatures />
        {/* not in use */}
        {!session && <CurrentSessionInfo />}
        <CurrentSessionInfo />
        <SecondaryFeatures />
      </main>
    </>
  );
};

export default Main;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const session = await getSession(context);

//   // if (!session) {
//   //   return {
//   //     redirect: {
//   //       destination: "/",
//   //       permanent: true,
//   //     },
//   //   };
//   // } else if (session.user.role) {
//   //   return {
//   //     redirect: {
//   //       destination: "/home",
//   //       permanent: false,
//   //     },
//   //   };
//   // } else {
//   return {
//     props: {},
//   };
//   // }
// };
