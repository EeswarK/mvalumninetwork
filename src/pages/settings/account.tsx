import { NavBar } from "@/components/ui/NavBar";
import type { NextPage } from "next";
import React from "react";

import { Layout } from "@/components/ui/Layout";
import Hero from "@/components/Landing/Hero";

const announcements = [
  {
    id: 1,
    title: "Office closed on July 2nd",
    href: "#",
    preview:
      "Cum qui rem deleniti. Suscipit in dolor veritatis sequi aut. Vero ut earum quis deleniti. Ut a sunt eum cum ut repudiandae possimus. Nihil ex tempora neque cum consectetur dolores.",
  },
  {
    id: 2,
    title: "New password policy",
    href: "#",
    preview:
      "Alias inventore ut autem optio voluptas et repellendus. Facere totam quaerat quam quo laudantium cumque eaque excepturi vel. Accusamus maxime ipsam reprehenderit rerum id repellendus rerum. Culpa cum vel natus. Est sit autem mollitia.",
  },
  {
    id: 3,
    title: "Office closed on July 2nd",
    href: "#",
    preview:
      "Tenetur libero voluptatem rerum occaecati qui est molestiae exercitationem. Voluptate quisquam iure assumenda consequatur ex et recusandae. Alias consectetur voluptatibus. Accusamus a ab dicta et. Consequatur quis dignissimos voluptatem nisi.",
  },
];

const account: NextPage = () => {
  return (
    <div className="relative min-h-full">
      <NavBar />
      <Layout>
        <div className="py-6">
          <div className="flex min-w-full justify-between">
            <div className="hidden w-1/4 md:block">
              <nav
                aria-label="Sidebar"
                className="sticky top-6 divide-y divide-gray-300 rounded-lg bg-white p-4 shadow"
              >
                <h2
                  className="text-base font-medium text-gray-900"
                  id="announcements-title"
                >
                  Announcements
                </h2>
                <div className="mt-6 flow-root">
                  <ul role="list" className="-my-5 divide-y divide-gray-200">
                    {announcements.map((announcement) => (
                      <li key={announcement.id} className="py-5">
                        <div className="relative focus-within:ring-2 focus-within:ring-cyan-500">
                          <h3 className="text-sm font-semibold text-gray-800">
                            <a
                              href={announcement.href}
                              className="hover:underline focus:outline-none"
                            >
                              {/* Extend touch target to entire panel */}
                              <span
                                className="absolute inset-0"
                                aria-hidden="true"
                              />
                              {announcement.title}
                            </a>
                          </h3>
                          <p className="line-clamp-2 mt-1 text-sm text-gray-600">
                            {announcement.preview}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6">
                  <a
                    href="#"
                    className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                  >
                    View all
                  </a>
                </div>
                {/* Your content */}
              </nav>
            </div>
            <main className="w-2/3 bg-red-200 px-4 lg:col-span-9 xl:col-span-6">
              <Hero />
              <Hero />
              <Hero />
            </main>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default account;
