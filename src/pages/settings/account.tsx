/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";

import { Layout } from "@ui/Layout";
import type { UserSettings } from "@/utils/constants";
import { USER_SETTINGS } from "@/utils/constants";
import clsx from "clsx";
import { getSession, SessionProvider, useSession } from "next-auth/react";
import type { GetServerSideProps } from "next";
import { Session } from "@prisma/client";

export default function Account() {
  const session = useSession();

  const [currentTab, setCurrentTab] = React.useState<UserSettings>(
    USER_SETTINGS[0]
  );

  return (
    <Layout protect className="mt-6 ">
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
            <currentTab.component />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: {},
  };
};
