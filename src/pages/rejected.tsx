import { Layout } from "@components/layout";
import { verifyAuth } from "@utils/verifyAuth";
import type { GetServerSidePropsContext } from "next";

export default Rejected;
function Rejected() {
  return (
    <Layout className="flex justify-center align-middle" protect>
      <h1 className="text-4xl font-bold">rejected</h1>
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
