import { Button } from "@/components/ui/Button";
import useAuthProvider from "@/lib/useAuthProvider";
import type { UserType } from "@/pages/onboarding/[[...step]]";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface IBasicInfoProps {
  userSettings: UserType;
  setUserSettings: Dispatch<SetStateAction<UserType>>;
  nextStep: () => void;
}

const BasicOnboardingValues = z.object({
  firstName: z.string().min(2).max(15),
  lastName: z.string().min(2).max(15),
  contactEmail: z.string(),
  graduationClass: z.number(),
});

type SchemaValidation = z.infer<typeof BasicOnboardingValues>;

const BasicInfoOnboarding = (props: IBasicInfoProps) => {
  const { userSettings, setUserSettings, nextStep } = props;
  const authProvider = useAuthProvider();

  const {
    register,
    handleSubmit,
    formState: errors,
  } = useForm<SchemaValidation>({
    resolver: zodResolver(BasicOnboardingValues),
    defaultValues: userSettings,
  });

  function submitSignInFlow(data: SchemaValidation) {
    setUserSettings({
      firstName: data.firstName,
      lastName: data.lastName,
      contactEmail: data.contactEmail,
      graduationClass: data.graduationClass,
    });
    nextStep();
  }

  return (
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
                autoComplete="given-name"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register("firstName", {
                  required: "First name is required",
                  maxLength: {
                    value: 15,
                    message: "First name cannot exceed 15 characters",
                  },
                })}
              />
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
                {...register("graduationClass", {
                  valueAsNumber: true,
                  min: 1969,
                  max: 2026,
                })}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
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
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end gap-6">
          <Button type="submit">Next</Button>
        </div>
      </div>
    </form>
  );
};

export default BasicInfoOnboarding;
