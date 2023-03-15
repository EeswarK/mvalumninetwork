import UserContainer from "@/components/screens/home/UserContainer";
import { Layout } from "@/components/new-ui/Layout";
import withAuth from "@/utils/withAuth";
import { useSession } from "next-auth/react";

export default withAuth(Home, "auth", "/home");
function Home() {
  const { data: session } = useSession();

  return (
    <Layout className="mt-8 flex flex-col items-center justify-center space-y-8">
      <h1 className="text-lg font-bold">Welcome {session?.user.name}</h1>
      <UserContainer session={session} />
    </Layout>
  );
}
