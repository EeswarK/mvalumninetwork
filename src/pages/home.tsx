import { Layout } from "@/components/ui/Layout";
import { getServerAuthSession } from "@/server/auth";
import { CardContainer } from "@ui/CardContainer";
import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import React from "react";

const users: UserType[] = [];

type UserType = {
  name: string;
  tagline: string;
  occupation: string;
  school: string;
};

const userhome: NextPage = () => {
  return (
    <Layout protect>
      <div>Home</div>
    </Layout>
  );
};

export default userhome;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  // if (session?.user?.role === null || session?.user?.role === undefined) {
  //   return {
  //     redirect: {
  //       destination: "/signinFlow",
  //       permanent: true,
  //     },
  //   };
  // }

  return {
    props: {},
  };
};
