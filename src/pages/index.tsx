import CurrentSessionInfo from "@/components/CurrentSessioninfo";
import Hero from "@/components/screens/landing/Hero";
import PrimaryFeatures from "@/components/screens/landing/PrimaryFeatures";
import SecondaryFeatures from "@/components/screens/landing/SecondaryFeatures";
import { useSession } from "next-auth/react";
import Head from "next/head";

export default Main;
function Main() {
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
}
