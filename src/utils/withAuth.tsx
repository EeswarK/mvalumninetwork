/* eslint-disable @typescript-eslint/no-floating-promises */
import type { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import * as React from "react";

export interface WithAuthProps {
  user: User;
}

const HOME_ROUTE = "/";
const LOGIN_ROUTE = "/signin";

const ROUTE_ROLES = [
  /**
   * For authentication pages
   * @example /login /register
   */
  "auth",
  /**
   * Optional authentication
   * It doesn't push to login page if user is not authenticated
   */
  "optional",
  /**
   * For all authenticated user
   * will push to login if user is not authenticated
   */
  "all",
] as const;
type RouteRole = (typeof ROUTE_ROLES)[number];

/**
 * Add role-based access control to a component
 *
 * @see https://react-typescript-cheatsheet.netlify.app/docs/hoc/full_example/
 * @see https://github.com/mxthevs/nextjs-auth/blob/main/src/components/withAuth.tsx
 */
export default function withAuth<T extends WithAuthProps = WithAuthProps>(
  Component: React.ComponentType<T>,
  routeRole: RouteRole
) {
  const ComponentWithAuth = (props: Omit<T, keyof WithAuthProps>) => {
    const router = useRouter();
    const { query } = router;
    const { data: session } = useSession();

    const isAuthenticated = session?.user.approved === "APPROVED";
    const user = session?.user;

    console.log("isAuthenticated", isAuthenticated);
    console.log("user", user);
    console.log("query redirect", query?.redirect);

    React.useEffect(() => {
      if (isAuthenticated) {
        // Prevent authenticated user from accessing auth or other role pages
        if (routeRole === "auth") {
          if (query?.redirect) {
            router.replace(query.redirect as string);
          } else {
            router.replace(HOME_ROUTE);
          }
        }
      } else {
        // Prevent unauthenticated user from accessing protected pages
        if (routeRole !== "auth" && routeRole !== "optional") {
          router.replace(
            `${LOGIN_ROUTE}?redirect=${router.asPath}`,
            `${LOGIN_ROUTE}`
          );
        }
      }
    }, [isAuthenticated, query, router, user]);

    // if (
    //   // If unauthenticated user want to access protected pages
    //   !isAuthenticated &&
    //   // auth pages and optional pages are allowed to access without login
    //   routeRole !== "auth" &&
    //   routeRole !== "optional"
    // ) {
    //   return (
    //     <div className="flex min-h-screen flex-col items-center justify-center text-gray-800">
    //       <ImSpinner8 className="mb-4 animate-spin text-4xl" />
    //       <p>Loading...</p>
    //     </div>
    //   );
    // }

    return <Component {...(props as T)} user={user} />;
  };

  return ComponentWithAuth;
}
