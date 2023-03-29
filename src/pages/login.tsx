import { Layout } from "@components/layout";
import { Logo } from "@/components/Logo";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui/tooltip";
import { Button } from "@components/ui/button";
import { requireAuth } from "@utils/auth";

export default Login;
function Login() {
  const router = useRouter();
  const { data: session } = useSession();

  const [email, setEmail] = React.useState("");

  if (session) {
    void router.replace("/home");
  }

  function sendEmail() {
    void signIn("email", { email });
    // void router.replace("/api/auth/verify-request?provider=email&type=email");
  }

  return (
    <Layout className="flex min-h-screen flex-col items-center justify-center py-12">
      <div className="text-center sm:mx-auto sm:w-full sm:max-w-md">
        <Logo />
        <h2 className="mt-6 text-3xl font-extrabold text-zinc-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={sendEmail} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full appearance-none rounded-md border border-zinc-300 px-3 py-2 shadow-sm placeholder:text-zinc-400 focus:border-violet-500 focus:outline-none focus:ring-violet-500 sm:text-sm"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <span className="mt-1 flex gap-1 text-xs font-medium text-zinc-500">
                Utilizing{" "}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>passwordless sign in.</TooltipTrigger>
                    <TooltipContent>
                      You&apos;ll receive an email to sign in.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </span>
            </div>

            <Button type="submit" className="w-full justify-center">
              Sign In
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-zinc-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button
                onClick={() => {
                  void signIn("google");
                }}
                variant="outline"
                className="w-full justify-center text-zinc-600"
              >
                <span className="sr-only">Sign in with Google</span>
                <svg
                  className="h-5 w-5"
                  aria-hidden="true"
                  data-icon="google"
                  viewBox="0 0 488 512"
                  fill="currentColor"
                >
                  <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                </svg>
              </Button>

              <Button
                onClick={() => void signIn("facebook")}
                variant="outline"
                className="w-full justify-center text-zinc-600"
              >
                <span className="sr-only">Sign in with Facebook</span>
                <svg
                  className="h-5 w-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" />
                </svg>
              </Button>

              {/* <Button
                href="#"
                intent="tertiary"
                className="w-full justify-center text-zinc-600"
              >
                <span className="sr-only">Sign in with Linkedin</span>
                <svg
                  className="h-5 w-5"
                  aria-hidden="true"
                  viewBox="0 0 310 310"
                  fill="currentColor"
                >
                  <path d="M72.16 99.73H9.927a5 5 0 0 0-5 5v199.928a5 5 0 0 0 5 5H72.16a5 5 0 0 0 5-5V104.73a5 5 0 0 0-5-5zM41.066.341C18.422.341 0 18.743 0 41.362 0 63.991 18.422 82.4 41.066 82.4c22.626 0 41.033-18.41 41.033-41.038C82.1 18.743 63.692.341 41.066.341zM230.454 94.761c-24.995 0-43.472 10.745-54.679 22.954V104.73a5 5 0 0 0-5-5h-59.599a5 5 0 0 0-5 5v199.928a5 5 0 0 0 5 5h62.097a5 5 0 0 0 5-5V205.74c0-33.333 9.054-46.319 32.29-46.319 25.306 0 27.317 20.818 27.317 48.034v97.204a5 5 0 0 0 5 5H305a5 5 0 0 0 5-5V194.995c0-49.565-9.451-100.234-79.546-100.234z" />
                </svg>
              </Button> */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = requireAuth(async () => {
  return { props: {} };
});
