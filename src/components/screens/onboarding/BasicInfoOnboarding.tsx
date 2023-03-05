import type { IOnboardingPageProps } from "@/pages/signinFlow";

interface IBasicInfoProps {
  user: IOnboardingPageProps["user"];
  nextStep: () => void;
}

const BasicInfoOnboarding = (props: IBasicInfoProps) => {
  return <></>;
};

export default BasicInfoOnboarding;
