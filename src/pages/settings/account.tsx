import { NavBar } from "@/components/ui/NavBar";
import type { NextPage } from "next";
import React from "react";

import { Fragment } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import {
  BellIcon,
  Bars3BottomRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import clsx from "clsx";
import { Logo } from "@/components/ui/Logo";
import { Layout } from "@/components/ui/Layout";

const user = {
  name: "Chelsea Hagon",
  email: "chelsea.hagon@example.com",
  imageUrl: "./stockpfp.avif",
};
const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Calendar", href: "#", current: false },
  { name: "Teams", href: "#", current: false },
  { name: "Directory", href: "#", current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

const account: NextPage = () => {
  return (
    <>
      <NavBar />
      <div className="bg-gray-100">
        <div className="py-6">
          <div className="mx-auto max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-8 lg:px-8">
            <div className="hidden lg:col-span-3 lg:block xl:col-span-2">
              <nav
                aria-label="Sidebar"
                className="sticky top-6 divide-y divide-gray-300 bg-yellow-200 px-4"
              >
                <div className="">hi</div>
                {/* Your content */}
              </nav>
            </div>
            <main className="bg-red-200 px-4 lg:col-span-9 xl:col-span-6">
              {/* Your content */}
            </main>
          </div>
        </div>
      </div>
      <Layout>
        <div className="py-6">
          <div className="mx-auto max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-8 lg:px-8">
            <div className="hidden lg:col-span-3 lg:block xl:col-span-2">
              <nav
                aria-label="Sidebar"
                className="sticky top-6 divide-y divide-gray-300 bg-yellow-200 px-4"
              >
                <div className="">hi</div>
                {/* Your content */}
              </nav>
            </div>
            <main className="bg-red-200 px-4 lg:col-span-9 xl:col-span-6">
              {/* Your content */}
            </main>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default account;
