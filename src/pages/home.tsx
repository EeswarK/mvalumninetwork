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
    <>
      <h1> Home </h1>
      {users.map((user) => {
        <CardContainer>
          <span>{user.name}</span>
          <span>{user.occupation}</span>
          <span>{user.tagline}</span>
        </CardContainer>;
      })}
    </>
  );
};

export default userhome;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  console.log("role", session?.user?.role);

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
