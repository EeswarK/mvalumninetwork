/* eslint-disable @typescript-eslint/consistent-type-imports */
import { CardContainer } from "@/components/ui/card-container";
import { api } from "@/utils/api";
import { Role, User } from "@prisma/client";
import { Session } from "next-auth";

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

  // useEffect(() => {
  //   console.log(getUsers.data);
  // }, [getUsers.data]);

  return (
    <div>
      {getUsers.data && (
        <div className="grid sm:grid-cols-1 md:grid-cols-3 md:space-x-12">
          {getUsers.data.map((user: User) => (
            <CardContainer className=" w-80" key={user.id}>
              <div>
                {user.firstName} {user.lastName}
              </div>
              <span>{user.contactEmail}</span>
              <span>{user.major ?? "no major"}</span>
            </CardContainer>
          ))}
        </div>
      )}
    </div>
  );
}
