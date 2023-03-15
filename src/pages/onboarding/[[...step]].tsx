/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Layout } from "@/components/new-ui/Layout";
import type { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { z } from "zod";
import { useRouter } from "next/router";
import { Steps } from "@/components/Steps";
import { StepCard } from "@/components/StepCard";
import BasicInfoOnboarding from "@/components/screens/onboarding/BasicInfoOnboarding";
import AdditionalInformationOnboarding from "@/components/screens/onboarding/AdditionalInformationOnboarding";
import ConfirmInformationOnboarding from "@/components/screens/onboarding/ConfirmInformationOnboarding";
import { useState } from "react";

/*
 *
 * This is the page that users are redirected to after they sign in with a provider.
 *
 * Based on our schema in api/schema.prisma, we need to collect the following information (3/1/23):
 * - Graduation year
 * - First name
 * - Last name
 * - Email
 * - Preferred name
 * - Bio
 */

// All the information we need to collect from the user, stored in a zod schema for type validation
export const OnboardingValues = z.object({
  firstName: z.string().min(2).max(15),
  lastName: z.string().min(2).max(15),
  contactEmail: z.string(),
  preferredName: z.string().min(2).max(15).optional(),
  bio: z.string().max(1000).optional(),
  graduationClass: z.number(),
});

export const defaultOnboardingValues = {
  firstName: "",
  lastName: "",
  contactEmail: "",
  preferredName: "",
  bio: "",
  graduationClass: 2022,
};

export type UserType = z.infer<typeof OnboardingValues>;

// Onboarding Steps
const INITIAL_STEP = "user-profile";
const steps = [
  "user-profile",
  "additional-information",
  "confirm-settings",
] as const;

// Change the current step shown
const stepTransform = (step: (typeof steps)[number]) => {
  const stepIndex = steps.indexOf(step);
  if (stepIndex > -1) {
    return steps[stepIndex];
  }
  return INITIAL_STEP;
};

// Step schema validation with zod
const stepRouteSchema = z.object({
  step: z.array(z.enum(steps)).default([INITIAL_STEP]),
});

//Page Header Names
const headers = [
  {
    title: "Basic Information",
    subtitle:
      "We just need some basic info. Don't worry, you can change it later.",
  },
  {
    title: "Additional Information",
    subtitle:
      "Adding a little more info will increase your chances of building your network.",
    skipText: "Skip for now",
  },
  {
    title: "Confirm your Info",
    subtitle: "Quickly double check to make sure everything is correct.",
  },
];

function SignInFlow() {
  const [userSettings, setUserSettings] = useState<UserType>(
    defaultOnboardingValues
  );
  const router = useRouter();

  const result = stepRouteSchema.safeParse(router.query);
  const currentStep = result.success ? result.data.step[0]! : INITIAL_STEP;

  const goToIndex = (index: number) => {
    const newStep = steps[index];
    router.push(
      {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        pathname: `/onboarding/${stepTransform(newStep!)}`,
      },
      undefined
    );
  };

  const currentStepIndex = steps.indexOf(currentStep);

  return (
    <Layout
      narrow
      className="flex min-h-screen flex-col items-center justify-center py-12"
      key={router.asPath}
      protect
    >
      <div className="text-center sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-3xl font-extrabold text-zinc-900">
          {headers[currentStepIndex]?.title || "Undefined title"}
        </h2>
        <p className="font-sans text-sm font-normal text-gray-500">
          {headers[currentStepIndex]?.subtitle || "Undefined title"}
        </p>
      </div>
      <Steps
        maxSteps={steps.length}
        currentStep={currentStepIndex + 1}
        navigateToStep={goToIndex}
      />
      <StepCard>
        {currentStep === "user-profile" && (
          <BasicInfoOnboarding
            userSettings={userSettings}
            setUserSettings={setUserSettings}
            nextStep={() => goToIndex(1)}
          />
        )}

        {currentStep === "additional-information" && (
          <AdditionalInformationOnboarding
            userSettings={userSettings}
            setUserSettings={setUserSettings}
            lastStep={() => goToIndex(0)}
            nextStep={() => goToIndex(2)}
          />
        )}

        {currentStep === "confirm-settings" && (
          <ConfirmInformationOnboarding
            userSettings={userSettings}
            lastStep={() => goToIndex(1)}
          />
        )}
      </StepCard>
    </Layout>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);

  if (!session?.user?.id) {
    return { redirect: { permanent: false, destination: "/signin" } };
  }

  if (session?.user.role) {
    return { redirect: { permanent: false, destination: "/home" } };
  }

  return {
    props: {},
  };
};

export default SignInFlow;
