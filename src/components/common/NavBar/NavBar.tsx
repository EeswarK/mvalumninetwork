/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Fragment } from "react";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";

import { Layout } from "@ui/Layout";
import { Button } from "@ui/Button";
import { Logo } from "../Logo";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { IS_DEV } from "@/utils/utils";

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
                  <Link
                    href="#features"
                    className="block w-full"
                    onClick={() => close()}
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#testimonials"
                    className="block w-full"
                    onClick={() => close()}
                  >
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pricing"
                    className="block w-full"
                    onClick={() => close()}
                  >
                    Pricing
                  </Link>
                </li>
                <li className="border-t border-zinc-300/40 pt-4">
                  <Link href="/login" className="block w-full">
                    Sign in
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
  const router = useRouter();

  // const [isScrolled, setIsScrolled] = useState(false);

  const seamless = router.pathname === "/";

  async function handleSignOut() {
    await signOut();
    return;
  }

  // useEffect(() => {
  //   function onScroll() {
  //     setIsScrolled(window.scrollY > 0);
  //   }
  //   onScroll();
  //   window.addEventListener("scroll", onScroll);
  //   return () => {
  //     window.removeEventListener("scroll", onScroll);
  //   };
  // }, []);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 bg-zinc-100",
        seamless
          ? "py-10"
          : "py-6 shadow-md shadow-slate-900/5 transition duration-500"
        // {
        //   "dark:bg-slate-900/95 dark:backdrop-blur dark:[@supports(backdrop-filter:blur(0))]:bg-slate-900/75":
        //     isScrolled,
        //   "dark:bg-transparent": !isScrolled,
        // }
      )}
    >
      <Layout className="">
        <nav className="text-sm">
          <ul className="flex items-center justify-between">
            <li>
              <Logo />
            </li>

            {/* dev option bug fixing */}
            {IS_DEV && (
              <li className="ml-auto">
                <Button onClick={() => router.reload()}>Reload Session</Button>
                <Button
                  onClick={() => router.replace("/onboarding")}
                  intent="secondary"
                >
                  check signinflow
                </Button>
              </li>
            )}

            {session ? (
              <li className="ml-auto hidden md:block">
                <Button onClick={handleSignOut} intent="tertiary">
                  <span>Sign Out</span>
                </Button>
              </li>
            ) : (
              <li className="ml-auto hidden md:block">
                <Button href="/signin" intent="tertiary">
                  <span>Login</span>
                </Button>
              </li>
            )}

            {session ? (
              <li className="ml-auto md:ml-6">
                <Button href="/home">
                  <span>Home</span>
                </Button>
              </li>
            ) : (
              <li className="ml-auto md:ml-6">
                <Button href="/signin">
                  <span>Sign Up!</span>
                </Button>
              </li>
            )}

            {session && (
              <li className="ml-auto hidden md:ml-6 md:block">
                <Button
                  onClick={() => router.replace("/settings/account")}
                  rounded="full"
                >
                  <span>{session.user.name?.charAt(1)}</span>
                </Button>
              </li>
            )}

            <li className="ml-5 -mr-1 md:hidden">
              <MobileNavigation />
            </li>
          </ul>
        </nav>
      </Layout>
    </header>
  );
}
