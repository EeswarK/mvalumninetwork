/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable-next-line tailwindcss/classnames-order, tailwindcss/no-custom-classname */
import { User } from "@prisma/client";
// import { Session } from "next-auth";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Label,
  Textarea,
} from "@components/ui";
import { Card, CardContent } from "@components/ui/card";
import Linkify from "linkify-react";

type UserContainerProps = {
  user: User;
};

export default UserContainer;
function UserContainer(props: UserContainerProps) {
  const { user } = props;

  return (
    <Dialog key={user.id}>
      <DialogTrigger asChild>
        <Card className="cursor-default transition-colors hover:bg-gray-50 ">
          <CardContent className="flex flex-row items-center space-x-6 py-6">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.image ?? ""} className="" />
              <AvatarFallback>
                <span className="overflow-hidden rounded-full bg-gray-100">
                  <svg
                    className="h-full w-full text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
              </AvatarFallback>
            </Avatar>

            <div>
              <span className="text-sm font-normal">{user.tagLine}</span>
              <div className="text-xl font-bold">
                {user.firstName} {user.lastName}
              </div>
              <p className="text-xs text-muted-foreground">
                Class of {user.graduationClass}
              </p>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader className="grid grid-cols-6 ">
          <div className="col-span-4">
            <DialogTitle className="mt-4">
              {user.firstName} {user.lastName}
            </DialogTitle>
            <DialogDescription className="flex flex-col">
              <span>Class of {user.graduationClass}</span>
              <span>{user.contactEmail ?? ""}</span>
            </DialogDescription>
          </div>
          <Avatar className="col-span-1 h-24 w-24">
            <AvatarImage src={user.image ?? ""} className="" />
            <AvatarFallback>
              <span className="overflow-hidden rounded-full bg-gray-100">
                <svg
                  className="h-full w-full text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>
            </AvatarFallback>
          </Avatar>
        </DialogHeader>
        <div className="flex flex-col gap-4 text-sm">
          <span className="text-lg font-medium ">{user.tagLine}</span>
          <div className="flex flex-col justify-start gap-4 whitespace-pre-line border-t-2 pt-4">
            <Linkify
              options={{ target: "_blank" }}
              className="whitespace-pre-line"
            >
              {user.bio}
            </Linkify>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
