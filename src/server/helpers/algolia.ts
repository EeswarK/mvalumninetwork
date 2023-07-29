/* eslint-disable @typescript-eslint/no-non-null-assertion */
import algoliasearch from "algoliasearch";
import { env } from "process";

export const client = algoliasearch(
  env.NEXT_PUBLIC_ALGOLIA_API_ID!,
  env.ALGOLIA_ADMIN_KEY!
);

export const algoliaIndex = client.initIndex(
  env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME!
);
