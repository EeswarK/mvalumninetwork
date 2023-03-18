import { Layout } from "@components/layout";
import withAuth from "@/utils/withAuth";

export default withAuth(Waiting, "auth", "/waiting");
function Waiting() {
  return (
    <Layout className="flex justify-center align-middle" protect>
      <h1 className="text-4xl font-bold">waiting</h1>
    </Layout>
  );
}
