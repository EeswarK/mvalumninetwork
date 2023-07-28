import UserContainer from "@/components/screens/home/UserContainer";
import { Layout } from "@components/layout";
import { useSession } from "next-auth/react";
import { Input } from "@ui/input";
import { requireAuth } from "@utils/auth";
import SearchingContainer from "@components/screens/home/SearchingContainer";
import type { User } from "@prisma/client";
import { Role } from "@prisma/client";
import { api } from "@utils/api";

export default function Home() {
  const { data: session } = useSession();

  const roleToQueryFor =
    session?.user.role === Role.STUDENT ? Role.ALUMNI : Role.STUDENT;
  const getUsers = api.users.getAllUsers.useQuery({
    role: roleToQueryFor,
  });

  return (
    <Layout className="mt-8 flex flex-col items-center justify-center space-y-8">
      <h1 className="text-lg font-bold">Welcome {session?.user.name}</h1>
      <Input className="w-1/2" />
      <SearchingContainer />

      {/* User container */}
      <div className="w-full">
        {getUsers.data && (
          // grid sm:grid-cols-1 md:grid-cols-3 md:space-x-12
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {getUsers.data.map((user: User) => (
              <UserContainer key={user.id} user={user} />
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
