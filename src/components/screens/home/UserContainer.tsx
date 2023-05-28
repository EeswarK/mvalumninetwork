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

type UserContainerProps = {
  session: Session | null;
};

export default UserContainer;
function UserContainer(props: UserContainerProps) {
  const { session } = props;

  const roleToQueryFor =
    session?.user.role === Role.STUDENT ? Role.ALUMNI : Role.STUDENT;
  const getUsers = api.users.getAllUsers.useQuery({
    role: roleToQueryFor,
  });

  return (
    <div>
      {getUsers.data && (
        <div className="grid sm:grid-cols-1 md:grid-cols-3 md:space-x-12">
          {getUsers.data.map((user: User) => (
            <Dialog key={user.id}>
              <DialogTrigger asChild>
                <CardContainer className="w-80 hover:bg-gray-50" key={user.id}>
                  <div className="flex">
                    <span className="invisible">
                      &apos;{user.graduationClass! % 100}
                    </span>
                    <Avatar className="mx-auto h-24 w-24">
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
                    &apos;{user.graduationClass! % 100}
                  </div>
                  <span>
                    {user.firstName} {user.lastName}
                  </span>
                  <span>{user.contactEmail}</span>
                </CardContainer>
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
          ))}
        </div>
      )}
    </div>
  );
}
