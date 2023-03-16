/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";

import { Layout } from "@ui/layout";
import ProfileSettings from "@/components/screens/settings/ProfileSettings";
import withAuth from "@/utils/withAuth";

function Account() {
  // const [currentTab, setCurrentTab] = React.useState<UserSettings>(
  //   USER_SETTINGS[0]
  // );

  return (
    <Layout className="mt-6 ">
      <div className="flex justify-center">
        {/* Settings Side Bar */}
        {/* <div className="sticky hidden w-1/4 scale-110 md:flex md:flex-col md:justify-center">
          <nav aria-label="Sidebar" className=" rounded-lg bg-white p-4 shadow">
            <div className="flow-root space-y-1">
              {USER_SETTINGS.map((item) => (
                <a
                  key={item.name}
                  className={clsx(
                    currentTab?.name === item.name
                      ? "bg-zinc-200 text-zinc-900"
                      : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900",
                    "text-md flex items-center rounded-md px-3 py-2 font-medium"
                  )}
                  onClick={() => {
                    setCurrentTab(item);
                  }}
                >
                  <item.icon
                    className={clsx(
                      currentTab?.name === item.name
                        ? "text-zinc-500"
                        : "text-zinc-400",
                      "-ml-1 mr-3 h-6 w-6 flex-shrink-0"
                    )}
                    aria-hidden="true"
                  />
                  <span className="truncate">{item.name}</span>
                </a>
              ))}
            </div>
          </nav>
        </div> */}
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

export default withAuth(Account, "auth", "/settings/account");
// export default Account;
