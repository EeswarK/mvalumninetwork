// import { GetStaticProps, NextPage } from "next";

// const ProfilePage: NextPage<{ username: string }> = ({ username }) => {

// export const getStaticProps: GetStaticProps = async (context) => {
//   const slug = context.params?.slug;

//   if (typeof slug !== "string") throw new Error("no slug");

//   const username = slug.replace("@", "");

//   await context.profile.getUserByUsername.prefetch({ username });

//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//       username,
//     },
//   };
// };
