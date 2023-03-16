/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Fragment } from "react";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";

import { Layout } from "@ui/layout";
import { Button, buttonVariants } from "@ui/button";
import { Logo } from "./Logo";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { IS_DEV } from "@/utils/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { User, Settings, LogOut } from "lucide-react";

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
        "sticky top-0 z-50",
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
            {IS_DEV && session && (
              <li className="ml-auto space-x-4">
                <Button onClick={() => router.reload()} variant="subtle">
                  Reload Session
                </Button>
                <Link
                  href="/onboarding"
                  className={buttonVariants({ variant: "subtle" })}
                >
                  check signinflow
                </Link>
              </li>
            )}

            {!session && (
              <li className="ml-auto hidden md:block">
                <Link href="/signin" className={buttonVariants({})}>
                  <span>Login</span>
                </Link>
              </li>
            )}

            {session && (
              <li className="md:ml-6 md:block">
                {/* <Link href="/settings/account">
                  <span>{session.user.name?.charAt(1)}</span>
                </Link> */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="relative h-10 w-10 rounded-full"
                    >
                      {session.user.name?.charAt(1)}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => router.replace("/settings/account")}
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
