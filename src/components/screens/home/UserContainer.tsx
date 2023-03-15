/* eslint-disable @typescript-eslint/consistent-type-imports */
import { CardContainer } from "@/components/ui/CardContainer";
import { api } from "@/utils/api";
import { Role } from "@prisma/client";
import { Session } from "next-auth";
import { useEffect } from "react";

type UserContainerProps = {
  session: Session | null;
};

export default UserContainer;
function UserContainer(props: UserContainerProps) {
  const { session } = props;

  const roleToQueryFor =
    session?.user.role !== Role.STUDENT ? Role.ALUMNI : Role.STUDENT;
  const getUsers = api.users.getAllUsers.useQuery({
    role: roleToQueryFor,
  });

  useEffect(() => {
    console.log(getUsers.data);
  }, [getUsers.data]);

  return (
    <div className="flex">
      {getUsers.data && (
        <div>
          {getUsers.data.map((user) => (
            <CardContainer key={user.id}>
              <div>
                {user.firstName} {user.lastName}
              </div>
              <span>body</span>
              <span>footer</span>
            </CardContainer>
          ))}
        </div>
      )}
    </div>
  );
}
