/* eslint-disable @typescript-eslint/no-floating-promises */
import type { User } from "@prisma/client";
import { Approved } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import * as React from "react";
import { useEffect } from "react";

export interface WithAuthProps {
  user: User;
}

const HOME_ROUTE = "/";
const LOGIN_ROUTE = "/login";
const ONBOARDING_ROUTE = "/onboarding";
const WAITING_ROUTE = "/waiting";
const REJECTED_ROUTE = "/rejected";

const ROUTE_ROLES = [
  /**
   * For authentication pages
   * @example /login /register
   */
  "auth",
  // "waiting",
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
  routeRole: RouteRole,
  route: string
) {
  const ComponentWithAuth = (props: Omit<T, keyof WithAuthProps>) => {
    const router = useRouter();
    const { query } = router;
    const { data: session, status } = useSession();

    const isAuthenticated = session?.user.approved === Approved.APPROVED;
    const needsToWait = session?.user.approved === Approved.WAITING;
    const isRejected = session?.user.approved === Approved.REJECTED;

    const isLoading = status === "loading";

    const needsToLogin = !!session;
    const needsToOnboard = !session?.user.role;

    // print all variables
    // console.log({
    //   isAuthenticated,
    //   isLoading,
    //   needsToOnboard,
    //   needsToWait,
    //   isRejected,
    // });

    useEffect(() => {
      if (isLoading) {
        if (isAuthenticated) {
          if (routeRole === "auth") {
            if (needsToLogin) {
              router.replace(LOGIN_ROUTE);
            } else if (needsToOnboard) {
              router.replace(ONBOARDING_ROUTE);
            } else if (needsToWait) {
              router.replace(WAITING_ROUTE);
            } else if (isRejected) {
              router.replace(REJECTED_ROUTE);
            } else {
              router.replace((query?.redirect as string) ?? route);
            }
            // } else if (routeRole === "waiting") {
            //   if (needsToWait) {
            //     router.replace(route);
            //   } else {
            //     router.replace(ERROR_ROUTE);
            //   }
          }
        } else {
          // Prevent unauthenticated user from accessing protected pages
          if (routeRole !== "all" && routeRole !== "optional") {
            router.replace(
              `${LOGIN_ROUTE}?redirect=${router.asPath}`,
              `${LOGIN_ROUTE}`
            );
          }
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, isLoading, query, router]);

    return <Component {...(props as T)} />;
  };

  return ComponentWithAuth;
}
