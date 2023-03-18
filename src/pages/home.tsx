import UserContainer from "@/components/screens/home/UserContainer";
import { Layout } from "@components/layout";
import withAuth from "@/utils/withAuth";
import { useSession } from "next-auth/react";
import { Input } from "@ui/input";

// export default withAuth(Home, "auth", "/home");
export default Home;
function Home() {
  const { data: session } = useSession();

  return (
    <Layout
      protect
      className="mt-8 flex flex-col items-center justify-center space-y-8"
    >
      <h1 className="text-lg font-bold">Welcome {session?.user.name}</h1>
      <Input className="w-1/2" />
      <UserContainer session={session} />
    </Layout>
  );
}
