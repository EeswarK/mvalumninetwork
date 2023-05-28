// /* eslint-disable @typescript-eslint/no-floating-promises */

import { Approved } from "@prisma/client";
import { getServerAuthSession } from "@server/auth";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";

export const requireAuth =
  (func: GetServerSideProps) => async (ctx: GetServerSidePropsContext) => {
    const session = await getServerAuthSession(ctx);

    /**
     * * Must be logged to use network
     * * If user is not logged in, redirect to login page
     **/
    if (!session) {
      if (!ctx.req.url?.includes("/login")) {
        return {
          redirect: {
            destination: `/login`,
            permanent: false,
          },
        };
      } else {
        return await func(ctx);
      }
    }

    /**
     * * Role is required to use network
     * * If user doesn't have role, redirect to onboarding page
     * * Role options are: "STUDENT" | "ALUMNI" | "ADMIN"
     **/
    if (!session.user.role) {
      if (!ctx.req.url?.includes("/onboarding")) {
        return {
          redirect: {
            destination: "/onboarding",
            permanent: false,
          },
        };
      } else {
        return await func(ctx);
      }
    }

    /**
     * * User must be approved to use network
     * * If user is not approved, redirect to waiting page
     * * Approval options are: "APPROVED" | "WAITING" | "REJECTED"
     * * If user is rejected, redirect to rejected page
     * * If user is waiting, redirect to waiting page
     **/
    if (session.user.approved === Approved.WAITING) {
      if (!ctx.req.url?.includes("/waiting")) {
        // console.log("take me to waiting");
        return {
          redirect: {
            destination: "/waiting",
            permanent: false,
          },
        };
      }
    } else if (session.user.approved === Approved.REJECTED) {
      if (!ctx.req.url?.includes("/rejected")) {
        return {
          redirect: {
            destination: "/rejected",
            permanent: false,
          },
        };
      }
    } else if (session.user.approved == null) {
      if (!ctx.req.url?.includes("/oops")) {
        return {
          redirect: {
            destination: "/oops",
            permanent: false,
          },
        };
      }
    }

    /**
     * * If user is approved, continue to page unless it's a situational page
     * * Situational pages are: login, waiting, rejected, onboarding
     */

    if (session.user.approved === Approved.APPROVED) {
      if (
        ctx.req.url?.includes("/waiting") ||
        ctx.req.url?.includes("/rejected") ||
        ctx.req.url?.includes("/login") ||
        ctx.req.url?.includes("/onboarding")
      ) {
        return {
          redirect: {
            destination: "/home",
            permanent: false,
          },
        };
      }
    }

    return await func(ctx);
  };
