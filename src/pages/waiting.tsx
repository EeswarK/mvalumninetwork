import { Layout } from "@/components/ui/Layout";
import type { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

const waiting = () => {
  return (
    <Layout className="flex justify-center align-middle" protect>
      <h1 className="text-4xl font-bold">waiting</h1>
    </Layout>
  );
};

export default waiting;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);

  if (!session?.user?.id) {
    return { redirect: { permanent: false, destination: "/signin" } };
  }

  if (session?.user.role) {
    return { redirect: { permanent: false, destination: "/home" } };
  }
};
