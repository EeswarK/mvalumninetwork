/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { requireAuth } from "@utils/auth";

// Change the current step shown

export default ProfilePage;
function ProfilePage() {
  return <div></div>;
}

export const getServerSideProps = requireAuth(async () => {
  return { props: {} };
});
