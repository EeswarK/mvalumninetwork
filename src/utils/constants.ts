/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import NotificationSettings from "@/components/screens/settings/NotificationSettings";
import ProfileSettings from "@/components/screens/settings/ProfileSettings";
// import SignInSettings from "@/components/screens/settings/SignInSettings";
import UnapprovedUsers from "@/components/screens/settings/UnapprovedUsers";
import {
  UserCircleIcon,
  LockClosedIcon,
  BellIcon,
} from "@heroicons/react/24/outline";

export const USER_SETTINGS = [
  {
    name: "Edit Profile",
    icon: UserCircleIcon,
    component: ProfileSettings,
  },
  // {
  //   name: "Sign In & Security",
  //   icon: LockClosedIcon,
  //   component: SignInSettings,
  // },
  {
    name: "Notifications",
    icon: BellIcon,
    component: NotificationSettings,
  },
  // {
  //   name: "Appearance",
  //   icon: HomeIcon,
  // },
  // {
  //   name: "Help & Support",
  //   icon: QuestionMarkCircleIcon,
  //   component: HelpSupport,
  // },
  {
    name: "Unapproved Users",
    icon: LockClosedIcon,
    component: UnapprovedUsers,
  },
] as const;

export type UserSettings = (typeof USER_SETTINGS)[number];
