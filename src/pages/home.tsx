import { Layout } from "@components/layout";
import UserContainer from "@components/screens/home/UserContainer";
import type { User } from "@prisma/client";
import { api } from "@utils/api";
import { requireAuth } from "@utils/auth";
import algoliasearch from "algoliasearch/lite";
import type { Hit as AlgoliaHit } from "instantsearch.js";
import type { GetServerSideProps } from "next";
import { SessionProvider } from "next-auth/react";
import singletonRouter from "next/router";
import React from "react";
import { renderToString } from "react-dom/server";
import type { InstantSearchServerState } from "react-instantsearch";
import {
  DynamicWidgets,
  InstantSearch,
  Hits,
  Highlight,
  RefinementList,
  SearchBox,
  InstantSearchSSRProvider,
  getServerState,
} from "react-instantsearch";
import { createInstantSearchRouterNext } from "react-instantsearch-router-nextjs";

const client = algoliasearch("6GU0SE5YJI", "2bf98c76aa322cf9d7058f8f7872434e");

type HitProps = {
  hit: AlgoliaHit<{
    objectID: string;
    firstName: string;
    lastName: string;
    preferredName: string;
    graduationClass: number;
    majors: string[];
    bio: string;
    role: string;
    type: "Users";
  }>;
};

export type PartialUser = Pick<
  User,
  | "id"
  | "firstName"
  | "lastName"
  | "preferredName"
  | "graduationClass"
  | "majors"
  | "bio"
  | "role"
  | "contactEmail"
  | "image"
>;

function Hit({ hit }: HitProps) {
  const getUser = api.users.getUserById.useQuery({ id: hit.objectID });

  return (
    <>
      <Highlight hit={hit} attribute="firstName" />
      <span className="">{hit.graduationClass}</span>
      {getUser.data && <UserContainer user={getUser.data} />}
      {/* <UserContainer user={getUser.data} /> */}
    </>
  );
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
        insights={true}
      >
        {/* <SessionProvider session={session}> */}
        <Layout className="mt-16 flex flex-col items-center justify-center space-y-8">
          <div className="w-full">
            <div>
              <DynamicWidgets fallbackComponent={FallbackComponent} />
            </div>
            <div>
              <SearchBox
                searchAsYouType={false}
                className="w-1/2 pl-12"
                classNames={{
                  root: "mx-auto",
                  input:
                    "h-10 w-5/6 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                  submit: "pl-2 scale-150",
                  resetIcon: "hidden",
                }}
              />
              <Hits />
              <Hits
                classNames={{
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
  requireAuth(async function getServerSideProps({ req }) {
    const protocol = req.headers.referer?.split("://")[0] || "https";
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const url = `${protocol}://${req.headers.host!}${req.url!}`;
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
