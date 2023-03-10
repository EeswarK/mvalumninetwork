import { Button } from "@/components/ui/Button";
import type { UserType } from "@/pages/signinFlow";
import { api } from "@/utils/api";

interface IConfirmationProps {
  userSettings: UserType;
}

const AdditionalInformationOnboarding = (props: IConfirmationProps) => {
  const { userSettings } = props;
  const updateUser = api.users.updateUser.useMutation();

  const submitSignInFlow = async () => {
    const user = await updateUser.mutateAsync({
      firstName: userSettings.firstName,
      lastName: userSettings.lastName,
      contactEmail: userSettings.contactEmail,
      graduationClass: userSettings.graduationYear,
      preferredName: userSettings.preferredName,
      bio: userSettings.bio,
    });
    console.log("success");
    console.log("user", user);
  };

  return (
    <div onSubmit={submitSignInFlow}>
      <div>
        {/* <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6"></div> */}

        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6"></div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end gap-6">
          <Button intent="secondary">No</Button>
          <Button type="submit">Yes</Button>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInformationOnboarding;
