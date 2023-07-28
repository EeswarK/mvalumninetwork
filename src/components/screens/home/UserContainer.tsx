/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { CardContainer } from "@ui/card-container";
import { api } from "@/utils/api";
import { Role, User } from "@prisma/client";
import { Session } from "next-auth";
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
} from "@components/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";

type UserContainerProps = {
  key: string;
  user: User;
};

export default UserContainer;
function UserContainer(props: UserContainerProps) {
  const { key, user } = props;

  return (
    <Dialog key={key}>
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
              <span className="text-sm font-normal">Computer Science</span>
              <div className="text-xl font-bold">
                {user.firstName} {user.lastName}
              </div>
              {/* eslint-disable-next-line tailwindcss/classnames-order, tailwindcss/no-custom-classname */}
              <p className="text-xs text-muted-foreground">
                Class of {user.graduationClass}
              </p>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader className="grid grid-cols-6">
          <div className="col-span-4">
            <DialogTitle>
              {user.firstName} {user.lastName}
            </DialogTitle>
            <DialogDescription className="flex flex-col">
              <span>{user.contactEmail}</span>
              <span>Class of {user.graduationClass}</span>
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
          <div className="flex items-center justify-start gap-4">
            <Label htmlFor="name" className="text-right">
              Bio
            </Label>
            <span>{user.bio}</span>
          </div>
          <div className="flex items-center justify-start gap-4">
            <Label htmlFor="name" className="text-right">
              Majors
            </Label>
            <span>{user.majors}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
