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
