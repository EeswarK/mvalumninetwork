/* eslint-disable @typescript-eslint/no-unused-vars */
import useAuthProvider from "@/lib/useAuthProvider";
import { Button, Input, Label } from "@components/ui";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { MAJORS, MAJORS_MAP } from "@utils/constants";
import { useOnboardingContext } from "@utils/onboardingContext";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { MultiValue } from "react-select";
import Select from "react-select";
import { z } from "zod";

interface IBasicInfoProps {
  nextStep: () => void;
}

const BasicOnboardingValues = z.object({
  firstName: z.string().min(2).max(15),
  lastName: z.string().min(2).max(15),
  contactEmail: z.string().email(),
  graduationClass: z.number().min(1969).max(2027),
  majors: z.array(z.string()).optional(),
});

type SchemaValidation = z.infer<typeof BasicOnboardingValues>;

const BasicInfoOnboarding = (props: IBasicInfoProps) => {
  const { nextStep } = props;
  const authProvider = useAuthProvider();

  const { userSettings, setUserSettings } = useOnboardingContext();
  const [selectedMajors, setSelectedMajors] = useState<MultiValue<string>>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaValidation>({
    resolver: zodResolver(BasicOnboardingValues),
    defaultValues: userSettings,
  });
  const [showErr, setShowErr] = useState(false);

  function submitSignInFlow(data: SchemaValidation) {
    if (
      errors.firstName ||
      errors.lastName ||
      errors.contactEmail ||
      errors.graduationClass
    ) {
      setShowErr(true);
      return;
    }
    setUserSettings({
      firstName: data.firstName,
      lastName: data.lastName,
      contactEmail: data.contactEmail,
      graduationClass: data.graduationClass,
      // majors: data.major,
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
            <Label htmlFor="first-name">Legal First name</Label>
            <div className="mt-1">
              <Input
                type="text"
                autoComplete="given-name"
                {...register("firstName", {
                  required: "First name is required",
                  // minLength: {
                  //   value: 2,
                  //   message: "First name must be at least 2 characters",
                  // },
                  // maxLength: {
                  //   value: 15,
                  //   message: "First name cannot exceed 15 characters",
                  // },
                })}
              />
            </div>
            {errors.firstName && (
              <p className="text-sm font-semibold text-red-400">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-3">
            <Label htmlFor="last-name">Legal Last name</Label>
            <div className="mt-1">
              <Input
                type="text"
                id="last-name"
                autoComplete="family-name"
                {...register("lastName", {
                  required: "Last name is required",
                  // minLength: {
                  //   value: 2,
                  //   message: "First name must be at least 2 characters",
                  // },
                  // maxLength: {
                  //   value: 15,
                  //   message: "First name cannot exceed 15 characters",
                  // },
                })}
              />
            </div>
            {errors.lastName && (
              <p className="text-sm font-semibold text-red-400">
                {errors.lastName.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-3">
            <Label htmlFor="last-name">Graduation Year</Label>
            <div className="mt-1">
              <Input
                type="number"
                id="graduation-year"
                {...register("graduationClass", {
                  required: "Graduation year is required",
                  valueAsNumber: true,
                  min: 1969,
                  max: 2026,
                })}
              />
            </div>
          </div>

          {/* <div className="sm:col-span-3">
            <Label htmlFor="major">Major</Label>
            <div className="mt-1">
              <Select
                isMulti
                options={MAJORS_MAP}
                value={selectedMajors}
                onChange={(o, _) => setSelectedMajors(o)}
                isOptionDisabled={() => selectedMajors.length >= 2}
                // className="mb-8"
                placeholder="Majors"
              />

              <ErrorMessage
                errors={errors}
                name="majors"
                render={({ message }) => <p>{message}</p>}
              />
            </div>
          </div> */}

          <div className="sm:col-span-6">
            <Label htmlFor="email">Contact Email address</Label>
            <div className="mt-1">
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                {...register("contactEmail", {
                  required: "Email is required",
                })}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end gap-6">
          <Button
            variant="outline"
            onClick={(e) => {
              e.preventDefault();
            }}
            type="button"
          >
            print
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </div>
    </form>
  );
};

export default BasicInfoOnboarding;
