import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import "../styles/globals.css";
import { api } from "@/utils/api";
import Head from "next/head";
import { AppShell } from "@/components/AppShell";
import { InstantSearch } from "react-instantsearch-hooks-web";
import { ALGOLIA_INDEX_NAME, searchClient } from "@utils/constants";

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
        <InstantSearch
          searchClient={searchClient}
          indexName={ALGOLIA_INDEX_NAME}
        >
          <AppShell>
            <Component {...pageProps} />
          </AppShell>
        </InstantSearch>
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
