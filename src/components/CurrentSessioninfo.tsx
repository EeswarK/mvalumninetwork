import type { inferSSRProps } from "@/lib/inferSSRProps";
import type { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { Layout } from "./new-ui/Layout";

function CurrentSessionInfo(props: inferSSRProps<typeof getServerSideProps>) {
  const { session } = props;

  return (
    <Layout className="flex justify-center">
      <span>Current Session info</span>
      <span>{session?.user.id ? session.user.id : "no id found"}</span>
      <span>{session?.user.name}</span>
      <span>{session?.user.role}</span>
      <span>{session?.user.approved}</span>
      {/* <span>{props.session?.user.id}</span> */}
    </Layout>
  );
}

export default CurrentSessionInfo;

const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
    };
  }

  return {
    props: { session },
  };
};
