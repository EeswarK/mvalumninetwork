import { Layout } from "@components/layout";
import withAuth from "@/utils/withAuth";
import { verifyAuth } from "@utils/verifyAuth";
import type { GetServerSidePropsContext } from "next";

export default withAuth(Waiting, "auth", "/waiting");
function Waiting() {
  return (
    <Layout className="flex justify-center align-middle" protect>
      <h1 className="text-4xl font-bold">waiting</h1>
    </Layout>
  );
}

export function getServerSideProps(context: GetServerSidePropsContext) {
  return verifyAuth(context, () => {
    return {
      props: {},
    };
  });
}
