import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Footer from "./Footer";
import { NavBar } from "./NavBar/NavBar";

export function AppLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  const router = useRouter();
  const isNoNavBarPage =
    router.pathname === "/signin" ||
    router.pathname === "/onboarding/[[...step]]";

  return (
    <div className="relative flex min-h-screen flex-col bg-zinc-100">
      {!isNoNavBarPage && <NavBar />}
      <div className="pb-24">{children}</div>
      {!isNoNavBarPage && <Footer />}
    </div>
  );
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const session = await getSession(context);

//   // if (session?.user.role === undefined) {
//   //   return {
//   //     redirect: {
//   //       destination: "/",
//   //       permanent: false,
//   //     },
//   //   };
//   // }

//   return {
//     props: {},
//   };
// };
