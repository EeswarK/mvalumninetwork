import { Input, Label, Textarea } from "@components/ui";
import { Button } from "@components/ui/button";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOnboardingContext } from "@utils/onboardingContext";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface IBasicInfoProps {
  lastStep: () => void;
  nextStep: () => void;
}

const AdditionalOnboardingValues = z.object({
  preferredName: z.string().optional(),
  tagLine: z.string().max(100).optional(),
  bio: z.string().max(1000).optional(),
  notifications: z.boolean().optional(),
});

type SchemaValidation = z.infer<typeof AdditionalOnboardingValues>;

const AdditionalInformationOnboarding = (props: IBasicInfoProps) => {
  const { lastStep, nextStep } = props;
  const { userSettings, setUserSettings } = useOnboardingContext();

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
      tagLine: data.tagLine,
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
                // className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="col-span-6">
            <Label htmlFor="tag-line">Tag line</Label>
            <Input
              id="tag-line"
              type="text"
              {...register("tagLine")}
              className="mt-1"
            />
          </div>
          <div className="sm:col-span-6">
            <Label htmlFor="about">About</Label>
            <div className="mt-1">
              <Textarea
                id="about"
                rows={3}
                // className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
          <Button
            variant="outline"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            print
          </Button>
          <Button
            variant="ghost"
            onClick={(e) => {
              lastStep;
              // e.preventDefault();
            }}
          >
            Back
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </div>
    </form>
  );
};

export default AdditionalInformationOnboarding;
