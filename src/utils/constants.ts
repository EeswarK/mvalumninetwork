/* eslint-disable @typescript-eslint/no-non-null-assertion */

import algoliasearch from "algoliasearch/lite";
import { env } from "process";

export const MAJORS: readonly string[] = [
  "Business",
  "Engineering",
  "Education",
  "Healthcare",
  "Humanities",
  "Law",
  "Social Sciences",
  "Environmental Science",
  "Media",
  "Computer Science",
  "Design",
  "Science",
  "Agriculture",
  "Psychology",
  "Public Policy",
  "Undecided",
];

type SelectOption = {
  readonly options: string;
  readonly label: string;
};

export const MAJORS_MAP: SelectOption[] = MAJORS.map((major) => ({
  options: major,
  label: major,
}));

export const majorsType = typeof MAJORS;

export const searchClient = algoliasearch(
  env.NEXT_PUBLIC_ALGOLIA_API_ID!,
  env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_KEY!
);

// export const ALGOLIA_INDEX_NAME = "Users";
export const ALGOLIA_INDEX_NAME = env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME!;
