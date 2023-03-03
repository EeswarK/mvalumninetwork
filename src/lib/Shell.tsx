import { api } from "@/utils/api";
import type { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Shell(props: ShellProps) {
  useRedirectToOnboardingIfNeeded();

  return (
    <div>
      <div {...props} />
    </div>
  );
}

const shouldShowOnboarding = (user: User) => {
  return !user.firstName;
};

function useRedirectToOnboardingIfNeeded() {
  const router = useRouter();
  const meQuery = api.users.getCurrentUser.useQuery();

  // const isRedirectingToOnboarding = user && shouldShowOnboarding(user);
}

type ShellProps = {
  children: React.ReactNode;
};
