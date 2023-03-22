/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect } from "react";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

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
  useRedirectToWaitingIfNeeded(protect);
  useRedirectToRejectedIfNeeded(protect);

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
        pathname: "/login",
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
  const { data: session } = useSession();

  const isRedirectingToOnboarding = !session?.user.role;
  const inOnboarding = router.pathname.includes("/onboarding");

  useEffect(() => {
    if (!isProtected || inOnboarding) {
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

function useRedirectToWaitingIfNeeded(isProtected: boolean) {
  const router = useRouter();
  const { data: session } = useSession();

  const isRedirectingToWaiting = session?.user.approved === "WAITING";

  useEffect(() => {
    if (!isProtected) {
      return;
    }

    if (isRedirectingToWaiting) {
      router.replace({
        pathname: "/waiting",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRedirectingToWaiting]);
}

function useRedirectToRejectedIfNeeded(isProtected: boolean) {
  const router = useRouter();
  const { data: session } = useSession();

  const isRedirectingToRejected = session?.user.approved === "REJECTED";

  useEffect(() => {
    if (!isProtected) {
      return;
    }

    if (isRedirectingToRejected) {
      router.replace({
        pathname: "/rejected",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRedirectingToRejected]);
}
