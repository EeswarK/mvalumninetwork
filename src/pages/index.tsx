import Hero from "@/components/screens/landing/Hero";
import SecondaryFeatures from "@/components/screens/landing/SecondaryFeatures";
import type { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";

export default Main;
function Main() {
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
        {/* <PrimaryFeatures /> */}
        {/* not in use */}
        <SecondaryFeatures />
      </main>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (session && context.req.headers["sec-fetch-site"] != "same-origin") {
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
}
