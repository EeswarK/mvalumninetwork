import { CardContainer } from "@/components/ui/CardContainer";
import { NavBar } from "@/components/ui/NavBar";
import type { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

const users: UserType[] = [];

type UserType = {
  name: string;
  tagline: string;
  occupation: string;
  school: string;
};

const Home: NextPage = () => {
  return (
    <>
      <NavBar />
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

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
