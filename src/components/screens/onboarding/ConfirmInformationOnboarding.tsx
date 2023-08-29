/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { api } from "@/utils/api";
import { Textarea } from "@components/ui";
import { Button } from "@components/ui/button";
import { Approved, Role } from "@prisma/client";
import { useOnboardingContext } from "@utils/onboardingContext";
import { useRouter } from "next/router";

interface IConfirmationProps {
  lastStep: () => void;
}

const AdditionalInformationOnboarding = (props: IConfirmationProps) => {
  const { lastStep } = props;
  const { userSettings } = useOnboardingContext();

  const updateUser = api.users.updateUser.useMutation({ onSuccess: onSuccess });
  const router = useRouter();

  function onSuccess() {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
    router.replace("/home");
  }

  const submitSignInFlow = async () => {
    const userRole =
      userSettings.graduationClass! <= 2022 ? Role.ALUMNI : Role.STUDENT;
    await updateUser.mutateAsync({
      firstName: userSettings.firstName,
      lastName: userSettings.lastName,
      contactEmail: userSettings.contactEmail,
      graduationClass: userSettings.graduationClass,
      preferredName: userSettings.preferredName,
      bio: userSettings.bio,
      tagLine: userSettings.tagLine,
      approved: Approved.WAITING,
      role: userRole,
    });
  };

  return (
    <div>
      <div>
        <div className="flex flex-col text-base font-normal text-gray-700">
          <span>
            <span className="font-bold">First Name: </span>
            {userSettings.firstName}
          </span>
          <span>
            <span className="font-bold">Last Name: </span>
            {userSettings.lastName}
          </span>
          {userSettings.preferredName && (
            <span>
              <span className="font-bold">Preferred Name: </span>
              {userSettings.preferredName}
            </span>
          )}
          <span>
            <span className="font-bold">Graduation Class: </span>
            {userSettings.graduationClass}
          </span>
          <span>
            <span className="font-bold">Email: </span>
            {userSettings.contactEmail}
          </span>
          <span>
            <span className="font-bold">Tag line: </span>
            {userSettings.tagLine}
          </span>
          <Textarea
            id="about"
            rows={3}
            className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            defaultValue={userSettings.bio}
            disabled
          />
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
          <Button variant="outline" onClick={lastStep}>
            Back
          </Button>
          <Button onClick={submitSignInFlow}>Yes</Button>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInformationOnboarding;
