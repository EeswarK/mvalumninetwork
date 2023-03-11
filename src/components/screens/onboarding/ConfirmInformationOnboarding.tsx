import { Button } from "@/components/ui/Button";
import type { UserType } from "@/pages/onboarding/[[...step]]";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface IConfirmationProps {
  userSettings: UserType;
  lastStep: () => void;
}

const AdditionalInformationOnboarding = (props: IConfirmationProps) => {
  const { userSettings, lastStep } = props;
  const updateUser = api.users.updateUser.useMutation({ onSuccess: onSuccess });
  const router = useRouter();

  function onSuccess() {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
    void router.replace("/home");
  }

  const submitSignInFlow = async () => {
    const user = await updateUser.mutateAsync({
      firstName: userSettings.firstName,
      lastName: userSettings.lastName,
      contactEmail: userSettings.contactEmail,
      graduationClass: userSettings.graduationYear,
      preferredName: userSettings.preferredName,
      bio: userSettings.bio,
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
          <span>
            <span className="font-bold">Preferred Name: </span>
            {userSettings.preferredName}
          </span>
          <span>
            <span className="font-bold">Graduation Class: </span>
            {userSettings.graduationYear}
          </span>
          <textarea
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
          <Button intent="secondary" onClick={lastStep}>
            Back
          </Button>
          <Button onClick={submitSignInFlow}>Yes</Button>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInformationOnboarding;
