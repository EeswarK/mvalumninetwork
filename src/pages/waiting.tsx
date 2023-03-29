import { Layout } from "@components/layout";
import { requireAuth } from "@utils/auth";

export default function Waiting() {
  return (
    <Layout className="flex justify-center align-middle" protect>
      <h1 className="text-4xl font-bold">waiting</h1>
    </Layout>
  );
}

export const getServerSideProps = requireAuth(async () => {
  return { props: {} };
});
