/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect } from "react";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import clsx from "clsx";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import { api } from "@/utils/api";

const layoutStyles = cva("max-w-7xl mx-auto", {
  variants: {
    narrow: {
      true: "max-w-3xl mx-auto",
      false: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
    },
  },
  defaultVariants: {
    narrow: false,
  },
});

interface LayoutProps
  extends React.ButtonHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof layoutStyles> {
  narrow?: boolean;
  protect?: boolean;
}

export const Layout: React.FC<LayoutProps> = (props) => {
  const { narrow, protect = false, className } = props;

  useRedirectToLoginIfUnauthenticated(protect);
  useRedirectToOnboardingIfNeeded(protect);

  if (narrow) {
    <div className={clsx(layoutStyles(), className)}>
      <div className={layoutStyles({ narrow })}>{props.children}</div>
    </div>;
  }

  return (
    <div className={clsx(layoutStyles(), className)}>{props.children}</div>
  );
};

function useRedirectToLoginIfUnauthenticated(isProtected: boolean) {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();

  useEffect(() => {
    if (!isProtected) {
      return;
    }

    if (!loading && !session) {
      router.replace({
        pathname: "/signin",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, session]);

  return {
    loading: loading && !session,
    session,
  };
}

function useRedirectToOnboardingIfNeeded(isProtected: boolean) {
  const router = useRouter();
  const { data: session, status } = useSession();

  const isRedirectingToOnboarding = !session?.user.role;

  useEffect(() => {
    if (!isProtected) {
      return;
    }

    if (isRedirectingToOnboarding) {
      router.replace({
        pathname: "/onboarding",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRedirectingToOnboarding]);
}

// const getServerSideProps = async (context) => {
//   const session = await getSession(context);
//   return {
//     props: {
//       session,
//     },
//   };
// }
