/* eslint-disable @typescript-eslint/consistent-type-imports */
import { CardContainer } from "@ui/card-container";
import { api } from "@/utils/api";
import { Role, User } from "@prisma/client";
import { Session } from "next-auth";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
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
                  <div>
                    {user.firstName} {user.lastName}
                  </div>
                  <span>{user.contactEmail}</span>
                  <span>{user.major ?? "no major"}</span>
                </CardContainer>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>
                    {user.firstName} {user.lastName}
                  </DialogTitle>
                  <DialogDescription>{user.bio}</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col text-sm">
                  <div className="flex items-center justify-start gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <span>{user.bio}</span>
                  </div>
                  <div className="flex items-center justify-start gap-4">
                    <Label htmlFor="username" className="text-right">
                      Username
                    </Label>
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
