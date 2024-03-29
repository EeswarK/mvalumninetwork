import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import "../styles/globals.css";
import { api } from "@/utils/api";
import Head from "next/head";
import { AppShell } from "@/components/AppShell";
import { Toaster } from "@components/ui";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const pageTitle = "MV Network";
  const description = "Monta Vista High School's alumni network.";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      <SessionProvider session={session}>
        <AppShell>
          <Component {...pageProps} />
        </AppShell>
        <Toaster />
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
