/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { requireAuth } from "@utils/auth";
import { useRouter } from "next/router";

// Change the current step shown

export default ProfilePage;
function ProfilePage() {
  const router = useRouter();

  return <div></div>;
}

export const getServerSideProps = requireAuth(async () => {
  return { props: {} };
});
