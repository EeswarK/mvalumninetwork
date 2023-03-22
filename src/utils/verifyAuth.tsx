// export default function ProtectedPage(Component: React.ComponentType) {
//   return Component;
// }

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   return checkAuth(context, () => {
//     return {
//       props: {},
//     };
//   });
// }
// --------------------------------------------------------------------------
// everything above this doesn't work because you can't run getserversideprops
// in a component, you can only run it in a page

import { Approved } from "@prisma/client";
import type { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

export async function verifyAuth(
  context: GetServerSidePropsContext,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: any
) {
  const session = await getSession(context);
  const query = context.resolvedUrl;

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } else if (session.user.approved === Approved.WAITING) {
    return {
      redirect: {
        destination: "/waiting",
        permanent: false,
      },
    };
  } else if (session.user.approved === Approved.REJECTED) {
    return {
      redirect: {
        destination: "/rejected",
        permanent: false,
      },
    };
  } else if (session.user.role == null) {
    return {
      redirect: {
        destination: "/onboarding",
        permanent: false,
      },
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return callback();
}
