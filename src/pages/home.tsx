/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable tailwindcss/no-custom-classname */
import UserContainer from "@/components/screens/home/UserContainer";
import { Layout } from "@components/layout";
import { useSession } from "next-auth/react";
import { Input } from "@ui/input";
import { requireAuth } from "@utils/auth";
import SearchingContainer from "@components/screens/home/SearchingContainer";
import type { User } from "@prisma/client";
import { Role } from "@prisma/client";
import { api } from "@utils/api";
import { SearchBox } from "react-instantsearch-hooks-web";

export default function Home() {
  const { data: session } = useSession();

  const roleToQueryFor =
    session?.user.role === Role.STUDENT ? Role.ALUMNI : Role.STUDENT;
  const getUsers = api.users.getAllUsers.useQuery({
    role: roleToQueryFor,
  });

  return (
    <Layout className="mt-16 flex flex-col items-center justify-center space-y-8">
      {/* <h1 className="text-lg font-bold">Welcome {session?.user.name}</h1> */}
      <SearchBox className="flex h-10 w-1/2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
      <SearchingContainer />

      {/* User container */}
      <div className="w-full">
        {getUsers.data && (
          // grid sm:grid-cols-1 md:grid-cols-3 md:space-x-12
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {getUsers.data.map((user: User) => (
              <div key={user.id}>
                <UserContainer user={user} />
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export const getServerSideProps = requireAuth(async () => {
  return { props: {} };
});
