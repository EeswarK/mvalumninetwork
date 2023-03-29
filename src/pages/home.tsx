import UserContainer from "@/components/screens/home/UserContainer";
import { Layout } from "@components/layout";
import { useSession } from "next-auth/react";
import { Input } from "@ui/input";
import { requireAuth } from "@utils/auth";

export default function Home() {
  const { data: session } = useSession();

  return (
    <Layout className="mt-8 flex flex-col items-center justify-center space-y-8">
      <h1 className="text-lg font-bold">Welcome {session?.user.name}</h1>
      <Input className="w-1/2" />
      <UserContainer session={session} />
    </Layout>
  );
}

export const getServerSideProps = requireAuth(async () => {
  return { props: {} };
});
