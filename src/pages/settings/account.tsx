/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";

import { Layout } from "@components/layout";
import ProfileSettings from "@/components/screens/settings/ProfileSettings";
import { requireAuth } from "@utils/auth";

export default Account;
function Account() {
  return (
    <Layout className="mt-6 ">
      <div className="flex justify-center">
        {/* Setting Content */}
        <div className="md:w-2/3">
          <div className="flex flex-col justify-center rounded-lg bg-white p-8 shadow-md">
            {/* <currentTab.component /> */}
            <ProfileSettings />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = requireAuth(async () => {
  return { props: {} };
});
