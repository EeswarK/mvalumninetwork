import { CardContainer } from "@/components/ui/CardContainer";
import { NavBar } from "@/components/ui/NavBar";
import React from "react";

const users: UserType[] = [];

type UserType = {
  name: string;
  tagline: string;
  occupation: string;
  school: string;
};

function Home() {
  return (
    <>
      <NavBar />
      {users.map((user) => {
        <CardContainer>
          <span>{user.name}</span>
          <span>{user.occupation}</span>
          <span>{user.tagline}</span>
        </CardContainer>;
      })}
    </>
  );
}

export default Home;
