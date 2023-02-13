/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Fragment } from "react";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";

import { Layout } from "./Layout";
import { Button } from "./Button";
import { Logo } from "./Logo";
import { useSession } from "next-auth/react";

function MobileNavigation() {
  return (
    <Popover>
      {({ open, close }) => (
        <>
          <Popover.Button className="relative z-10 flex h-8 w-8 items-center justify-center [&:not(:focus-visible)]:focus:outline-none">
            <span className="sr-only">Toggle Navigation</span>
            <svg
              aria-hidden="true"
              className="h-3.5 w-3.5 overflow-visible stroke-zinc-700"
              fill="none"
              strokeWidth={2}
              strokeLinecap="round"
            >
              <path
                d="M0 1H14M0 7H14M0 13H14"
                className={clsx("origin-center transition", {
                  "scale-90 opacity-0": open,
                })}
              />
              <path
                d="M2 2L12 12M12 2L2 12"
                className={clsx("origin-center transition", {
                  "scale-90 opacity-0": !open,
                })}
              />
            </svg>
          </Popover.Button>
          <Transition.Root>
            <Transition.Child
              as={Fragment}
              enter="duration-150 ease-out"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="duration-150 ease-in"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Popover.Overlay className="fixed inset-0 bg-zinc-300/50" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="duration-150 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-100 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Popover.Panel
                as="ul"
                className="absolute inset-x-0 top-full mt-4 origin-top space-y-4 rounded-2xl bg-white p-6 text-lg tracking-tight text-zinc-900 shadow-xl ring-1 ring-zinc-900/5"
              >
                <li>
                  <Link href="#features">
                    <a className="block w-full" onClick={() => close()}>
                      Features
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="#testimonials">
                    <a className="block w-full" onClick={() => close()}>
                      Testimonials
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="#pricing">
                    <a className="block w-full" onClick={() => close()}>
                      Pricing
                    </a>
                  </Link>
                </li>
                <li className="border-t border-zinc-300/40 pt-4">
                  <Link href="/login">
                    <a className="block w-full">Sign in</a>
                  </Link>
                </li>
              </Popover.Panel>
            </Transition.Child>
          </Transition.Root>
        </>
      )}
    </Popover>
  );
}

export function NavBar() {
  const { data: session } = useSession();

  return (
    <header className="py-10">
      <Layout>
        <nav className="relative z-50 text-sm">
          <ul className="flex items-end">
            <li>
              <Logo />
            </li>
            {/* <li className="ml-20 hidden md:block">
              <Link
                href="#features"
                className="rounded-lg py-1 px-2 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900"
              >
                <span>Features</span>
              </Link>
            </li>
            <li className="ml-6 hidden md:block">
              <Link
                href="#testimonials"
                className="rounded-lg py-1 px-2 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900"
              >
                <span>Testimonials</span>
              </Link>
            </li>
            <li className="ml-6 hidden md:block">
              <Link
                href="#pricing"
                className="rounded-lg py-1 px-2 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900"
              >
                <span>Pricing</span>
              </Link>
            </li> */}
            {session ? (
              <li className="ml-auto hidden md:block">
                <Button href="/login" intent="tertiary">
                  <span>Logged In!</span>
                </Button>
              </li>
            ) : (
              <li className="ml-auto hidden md:block">
                <Button href="/register" intent="tertiary">
                  <span>Login</span>
                </Button>
              </li>
            )}

            <li className="ml-auto md:ml-6">
              <Button href="/register">
                <span>Sign Up!</span>
              </Button>
            </li>
            <li className="ml-5 -mr-1 md:hidden">
              <MobileNavigation />
            </li>
          </ul>
        </nav>
      </Layout>
    </header>
  );
}
