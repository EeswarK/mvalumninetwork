import { Layout } from "@components/layout";
import { requireAuth } from "@utils/auth";

export default function Waiting() {
  return (
    <Layout className="flex flex-col justify-center align-middle" protect>
      <h1 className="text-4xl font-bold">
        oops, you werent supposed to see this
      </h1>
      <p>Contact us with your email and we&apos;ll fix it asap</p>
    </Layout>
  );
}

export const getServerSideProps = requireAuth(async () => {
  return { props: {} };
});
