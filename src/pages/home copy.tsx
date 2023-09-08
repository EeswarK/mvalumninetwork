import { Layout } from "@components/layout";
// import { InfiniteHits } from "@components/screens/home/InfiniteHits";
import UserContainer from "@components/screens/home/UserContainer";
import type { User } from "@prisma/client";
import { client } from "@server/helpers/algolia";
import { requireAuth } from "@utils/auth";
import algoliasearch from "algoliasearch/lite";
import type { Hit as AlgoliaHit } from "instantsearch.js";
import type { GetServerSideProps } from "next";
import singletonRouter from "next/router";
import React from "react";
import { renderToString } from "react-dom/server";
import type { InstantSearchServerState } from "react-instantsearch";
import {
  DynamicWidgets,
  InstantSearch,
  Hits,
  RefinementList,
  SearchBox,
  InstantSearchSSRProvider,
  getServerState,
} from "react-instantsearch";
import { createInstantSearchRouterNext } from "react-instantsearch-router-nextjs";

type HitProps = {
  hit: AlgoliaHit<{
    objectID: string;
    firstName: string;
    lastName: string;
    preferredName: string;
    contactEmail: string;
    image: string;
    graduationClass: number;
    tagLine: string;
    bio: string;
    role: string;
    type: "Users";
  }>;
};

function Hit({ hit }: HitProps) {
  const user = hit as unknown as User;

  return <UserContainer user={user} />;
}

type HomePageProps = {
  serverState?: InstantSearchServerState;
  url?: string;
};

export default function HomePage({ serverState, url }: HomePageProps) {
  return (
    <InstantSearchSSRProvider {...serverState}>
      <InstantSearch
        searchClient={client}
        indexName="Users"
        routing={{
          router: createInstantSearchRouterNext({
            serverUrl: url,
            singletonRouter,
          }),
        }}
      >
        <Layout className="mt-16 flex flex-col items-center justify-center space-y-8">
          <div className="w-full">
            <div>
              <DynamicWidgets fallbackComponent={FallbackComponent} />
            </div>
            <div>
              <SearchBox
                searchAsYouType={false}
                classNames={{
                  root: "mx-auto md:w-1/2",
                  input:
                    "h-10 w-5/6 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                  submit: "pl-4 scale-150",
                  resetIcon: "hidden",
                }}
              />

              <Hits
                classNames={{
                  root: "mt-6",
                  // list: "space-y-12",
                  list: "grid gap-4 md:grid-cols-2 lg:grid-cols-3",
                }}
                hitComponent={Hit}
              />
            </div>
          </div>
        </Layout>
      </InstantSearch>
    </InstantSearchSSRProvider>
  );
}

function FallbackComponent({ attribute }: { attribute: string }) {
  return <RefinementList attribute={attribute} />;
}

export const getServerSideProps: GetServerSideProps<HomePageProps> =
  requireAuth(async function getServerSideProps(ctx) {
    const protocol = ctx.req.headers.referer?.split("://")[0] || "https";
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const url = `${protocol}://${ctx.req.headers.host!}${ctx.req.url!}`;
    const serverState = await getServerState(<HomePage url={url} />, {
      renderToString,
    });

    return {
      props: {
        serverState,
        url,
      },
    };
  });
