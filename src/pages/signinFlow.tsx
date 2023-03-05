/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button } from "@/components/ui/Button";
import { Layout } from "@/components/ui/Layout";
import { api } from "@/utils/api";
import type { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ErrorMessage } from "@hookform/error-message";
import { useRouter } from "next/router";
import { prisma } from "@/server/db";
import useAuthProvider from "@/lib/useAuthProvider";
import type { inferSSRProps } from "@/lib/inferSSRProps";
import { Steps } from "@/components/Steps";
import { StepCard } from "@/components/StepCard";
import BasicInfoOnboarding from "@/components/screens/onboarding/BasicInfoOnboarding";
import AdditionalInformationOnboarding from "@/components/screens/onboarding/AdditionalInformationOnboarding";
import ConfirmInformationOnboarding from "@/components/screens/onboarding/ConfirmInformationOnboarding";

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
const OnboardingValues = z.object({
  firstName: z.string().min(2).max(15),
  lastName: z.string().min(2).max(15),
  contactEmail: z.string(),
  preferredName: z.string().min(2).max(15),
  bio: z.string().max(1000),
  graduationYear: z.number(),
});

type SchemaValidation = z.infer<typeof OnboardingValues>;

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

export type IOnboardingPageProps = inferSSRProps<typeof getServerSideProps>;

export default function SignInFlow(props: IOnboardingPageProps) {
  const { user } = props;
  const router = useRouter();

  const authProvider = useAuthProvider();
  const updateUser = api.users.updateUser.useMutation();

  const result = stepRouteSchema.safeParse(router.query);
  const currentStep = result.success ? result.data.step[0]! : INITIAL_STEP;

  const goToIndex = (index: number) => {
    const newStep = steps[index];
    void router.push(
      {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        pathname: `/getting-started/${stepTransform(newStep!)}`,
      },
      undefined
    );
  };

  const currentStepIndex = steps.indexOf(currentStep);

  const {
    register,
    handleSubmit,
    formState: errors,
  } = useForm<SchemaValidation>({
    resolver: zodResolver(OnboardingValues),
  });

  const submitSignInFlow: SubmitHandler<SchemaValidation> = async (data) => {
    await updateUser.mutateAsync({
      firstName: data.firstName,
      lastName: data.lastName,
      contactEmail: data.contactEmail,
      preferredName: data.preferredName,
      bio: data.bio,
      graduationClass: data.graduationYear,
    });
  };

  return (
    <Layout
      className="flex min-h-screen flex-col items-center justify-center py-12"
      key={router.asPath}
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
          <BasicInfoOnboarding user={user} nextStep={() => goToIndex(1)} />
        )}

        {currentStep === "additional-information" && (
          <AdditionalInformationOnboarding nextStep={() => goToIndex(2)} />
        )}

        {currentStep === "confirm-settings" && <ConfirmInformationOnboarding />}
      </StepCard>
      <form onSubmit={handleSubmit(submitSignInFlow)}>
        <div className="mt-6">
          <div>
            <p className="">
              Currently authenticated with{" "}
              <span className="font-bold">{authProvider}</span>
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700"
              >
                Legal First name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="first-name"
                  autoComplete="given-name"
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  {...register("firstName")}
                />
                <ErrorMessage errors={errors} name="firstName" />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium text-gray-700"
              >
                Legal Last name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="last-name"
                  autoComplete="family-name"
                  required
                  {...register("lastName")}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <ErrorMessage errors={errors} name="lastName" />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium text-gray-700"
              >
                Preferred First name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="last-name"
                  autoComplete="given-name"
                  {...register("preferredName")}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.touchedFields.preferredName && (
                  <span className="mt-2 block text-red-800">
                    {errors.touchedFields.preferredName.valueOf()}
                  </span>
                )}
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium text-gray-700"
              >
                Graduation Year
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  id="graduation-year"
                  required
                  {...register("graduationYear", {
                    valueAsNumber: true,
                    min: 1969,
                    max: 2026,
                  })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <ErrorMessage errors={errors} name="graduationYear" />
            </div>
            <div className="sm:col-span-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Contact Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                {...register("contactEmail")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <ErrorMessage errors={errors} name="contactEmail" />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <label
                htmlFor="about"
                className="block text-sm font-medium text-gray-700"
              >
                About
              </label>
              <div className="mt-1">
                <textarea
                  id="about"
                  rows={3}
                  className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  defaultValue={""}
                  {...register("bio")}
                />
              </div>
              <ErrorMessage errors={errors} name="bio" />
              <p className="mt-2 text-sm text-gray-500">
                Write a few sentences about yourself.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end gap-6">
            <Button type="submit">Submit</Button>
          </div>
        </div>
      </form>
    </Layout>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);
  console.log("session", session);

  if (!session?.user?.id) {
    return { redirect: { permanent: false, destination: "/signin" } };
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      preferredName: true,
      email: true,
      contactEmail: true,
      image: true,
      bio: true,
      role: true,
      approved: true,
    },
  });

  // const user = {};

  if (!user) {
    throw new Error("User from session not found");
  }

  if (user?.role) {
    return { redirect: { permanent: false, destination: "/home" } };
  }

  return {
    props: {
      user: {
        ...user,
      },
    },
  };
};
