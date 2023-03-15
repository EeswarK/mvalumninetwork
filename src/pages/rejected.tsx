import { Layout } from "@/components/ui/layout";
import withAuth from "@/utils/withAuth";

export default withAuth(Rejected, "auth", "/rejected");
function Rejected() {
  return (
    <Layout className="flex justify-center align-middle" protect>
      <h1 className="text-4xl font-bold">rejected</h1>
    </Layout>
  );
}
