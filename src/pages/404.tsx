import { Layout } from "@/components/new-ui/Layout";
import withAuth from "@/utils/withAuth";

export default withAuth(error, "all", "/404");
function error() {
  return (
    <Layout className="flex justify-center align-middle" protect>
      <h1 className="text-4xl font-bold">waiting</h1>
    </Layout>
  );
}
