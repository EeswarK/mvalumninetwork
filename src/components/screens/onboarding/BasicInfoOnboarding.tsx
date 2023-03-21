import useAuthProvider from "@/lib/useAuthProvider";
import type { UserType } from "@/pages/onboarding/[[...step]]";
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { MAJORS } from "@utils/constants";
import type { Dispatch, SetStateAction } from "react";
import { useEffect } from "react";
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
  major: z.string().optional(),
});

type SchemaValidation = z.infer<typeof BasicOnboardingValues>;

const BasicInfoOnboarding = (props: IBasicInfoProps) => {
  const { userSettings, setUserSettings, nextStep } = props;
  const authProvider = useAuthProvider();

  const {
    register,
    handleSubmit,
    formState: { errors },
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
      majors: data.major,
    });
    nextStep();
  }

  // handleSubmit(submitSignInFlow)
  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
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
                  maxLength: {
                    value: 15,
                    message: "First name cannot exceed 15 characters",
                  },
                })}
              />
              <ErrorMessage
                errors={errors}
                name="firstName"
                render={({ message }) => <Input>{message}</Input>}
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <Label htmlFor="last-name">Legal Last name</Label>
            <div className="mt-1">
              <Input
                type="text"
                id="last-name"
                autoComplete="family-name"
                required
                {...register("lastName")}
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <Label htmlFor="last-name">Graduation Year</Label>
            <div className="mt-1">
              <Input
                type="number"
                id="graduation-year"
                required
                {...register("graduationClass", {
                  valueAsNumber: true,
                  min: 1969,
                  max: 2026,
                })}
              />
            </div>
          </div>

          {/* <div className="sm:col-span-3">
            <Label htmlFor="last-name">Major</Label>
            <div className="mt-1">
              <Select>
                <SelectTrigger>
                  <SelectValue
                    placeholder="Choose Major"
                    {...register("major")}
                  ></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {MAJORS.map((major) => (
                    <SelectItem key={major} value={major}>
                      {major}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <ErrorMessage
                errors={errors}
                name="major"
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
                {...register("contactEmail")}
              />
            </div>
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
