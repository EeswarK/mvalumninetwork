import { Layout } from "@/components/ui/layout";
import withAuth from "@/utils/withAuth";

export default withAuth(Error, "all", "/error");
function Error() {
  return (
    <Layout className="flex justify-center align-middle" protect>
      <h1 className="text-4xl font-bold">waiting</h1>
    </Layout>
  );
}
