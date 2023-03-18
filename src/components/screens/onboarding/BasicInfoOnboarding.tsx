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

  const { register, handleSubmit } = useForm<SchemaValidation>({
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

          <div className="sm:col-span-3">
            <Label htmlFor="last-name">Major</Label>
            <div className="mt-1">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
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

          <div className="sm:col-span-6">
            <Label htmlFor="email">Contact Email address</Label>
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

      <div className="pt-5">
        <div className="flex justify-end gap-6">
          <Button type="submit">Next</Button>
        </div>
      </div>
    </form>
  );
};

export default BasicInfoOnboarding;
