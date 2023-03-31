/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Layout } from "@components/layout";
import { z } from "zod";
import { useRouter } from "next/router";
import { Steps } from "@/components/Steps";
import { StepCard } from "@/components/StepCard";
import BasicInfoOnboarding from "@/components/screens/onboarding/BasicInfoOnboarding";
import AdditionalInformationOnboarding from "@/components/screens/onboarding/AdditionalInformationOnboarding";
import ConfirmInformationOnboarding from "@/components/screens/onboarding/ConfirmInformationOnboarding";
import { requireAuth } from "@utils/auth";
import { OnboardingProvider } from "@utils/onboardingContext";

// All the information we need to collect from the user, stored in a zod schema for type validation

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

export default SignInFlow;
function SignInFlow() {
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
    <OnboardingProvider>
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
              nextStep={() => {
                goToIndex(1);
              }}
            />
          )}

          {currentStep === "additional-information" && (
            <AdditionalInformationOnboarding
              lastStep={() => goToIndex(0)}
              nextStep={() => goToIndex(2)}
            />
          )}

          {currentStep === "confirm-settings" && (
            <ConfirmInformationOnboarding lastStep={() => goToIndex(1)} />
          )}
        </StepCard>
      </Layout>
    </OnboardingProvider>
  );
}

export const getServerSideProps = requireAuth(async () => {
  return { props: {} };
});
