import type { UserType } from "@/pages/onboarding/[[...step]]";
import {
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
  Textarea,
} from "@components/ui";
import { Button } from "@components/ui/button";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Dispatch, SetStateAction } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface IBasicInfoProps {
  userSettings: UserType;
  setUserSettings: Dispatch<SetStateAction<UserType>>;
  lastStep: () => void;
  nextStep: () => void;
}

const AdditionalOnboardingValues = z.object({
  preferredName: z.string().min(2).max(15).optional(),
  bio: z.string().max(1000).optional(),
  notifications: z.boolean().optional(),
});

type SchemaValidation = z.infer<typeof AdditionalOnboardingValues>;

const AdditionalInformationOnboarding = (props: IBasicInfoProps) => {
  const { userSettings, setUserSettings, lastStep, nextStep } = props;

  const {
    register,
    handleSubmit,
    formState: errors,
  } = useForm<SchemaValidation>({
    resolver: zodResolver(AdditionalOnboardingValues),
    defaultValues: userSettings,
  });

  const submitSignInFlow: SubmitHandler<SchemaValidation> = (data) => {
    setUserSettings({
      ...userSettings,
      preferredName: data.preferredName,
      bio: data.bio,
      notifications: data.notifications,
    });
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(submitSignInFlow)}>
      <div>
        {/* <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6"></div> */}

        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <Label htmlFor="last-name">Preferred First name</Label>
            <div className="mt-1">
              <Input
                type="text"
                id="preferred-name"
                autoComplete="given-name"
                {...register("preferredName")}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="sm:col-span-6">
            <Label htmlFor="about">About</Label>
            <div className="mt-1">
              <Textarea
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
        <div className="sm:col-span-6">
          <Label htmlFor="notifications">Notification Preferences</Label>
          <div className="mt-1">
            <RadioGroup defaultValue="option-one">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-one" id="option-one" />
                <Label htmlFor="option-one">Option One</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-two" id="option-two" />
                <Label htmlFor="option-two">Option Two</Label>
              </div>
            </RadioGroup>
          </div>
          <ErrorMessage errors={errors} name="bio" />
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end gap-6">
          <Button variant="ghost" onClick={lastStep}>
            Back
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </div>
    </form>
  );
};

export default AdditionalInformationOnboarding;
