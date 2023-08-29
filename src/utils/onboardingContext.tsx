/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useContext, useState } from "react";
import { createContext } from "react";
import { z } from "zod";

/**
 *
 * * This is the onboarding information we need to get from users are redirected to after they sign in with a provider.
 *
 * Based on our schema in api/schema.prisma, we need to collect the following information (3/1/23):
 * - Graduation year
 * - First name
 * - Last name
 * - Email
 * - Preferred name
 * - Bio
 **/

// All the information we need to collect from the user, stored in a zod schema for type validation
export const OnboardingValues = z.object({
  firstName: z.string().min(2).max(15).optional(),
  lastName: z.string().min(2).max(15).optional(),
  contactEmail: z.string().optional(),
  preferredName: z.string().optional(),
  bio: z.string().max(1000).optional(),
  graduationClass: z.number().optional(),
  tagLine: z.string().max(100).optional(),
});

type OnboardingContextType = {
  userSettings: UserType;
  setUserSettings: React.Dispatch<React.SetStateAction<UserType>>;
};

export type UserType = z.infer<typeof OnboardingValues>;

export const OnboardingContext = createContext<OnboardingContextType>({
  userSettings: {},
  setUserSettings: () => {},
});

export const useOnboardingContext = () => {
  return useContext(OnboardingContext);
};

export function OnboardingProvider(props: { children: React.ReactNode }) {
  const { children } = props;
  const [userSettings, setUserSettings] = useState<UserType>({});

  return (
    <OnboardingContext.Provider value={{ userSettings, setUserSettings }}>
      {children}
    </OnboardingContext.Provider>
  );
}
