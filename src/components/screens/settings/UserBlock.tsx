import { api } from "@/utils/api";
import { Button } from "@components/ui/button";
import type { User } from "@prisma/client";
import UserContainer from "../home/UserContainer";

export default function UserBlock({
  user,
  confirm,
  setConfirm,
  setActionTaken,
  index,
}: {
  user: User;
  confirm?: boolean;
  setConfirm: React.Dispatch<React.SetStateAction<boolean[]>>;
  setActionTaken: React.Dispatch<React.SetStateAction<boolean[]>>;
  index: number;
}) {
  const userApprove = api.users.approve.useMutation();
  const userDecline = api.users.decline.useMutation();

  function approveUser() {
    userApprove.mutate({ id: user.id });
    setActionTaken((prevState) => {
      const newAction = [...prevState];
      newAction[index] = true;
      return newAction;
    });
  }

  function declineUser() {
    userDecline.mutate({ id: user.id });
    setActionTaken((prevState) => {
      const newAction = [...prevState];
      newAction[index] = true;
      return newAction;
    });
  }

  return (
    <div key={user.id} className="flex items-center justify-between py-3">
      <div className="w-1/2">
        <UserContainer key={user.id} user={user} />
      </div>
      <div className="space-x-4">
        {confirm ? (
          <Button variant="outline" onClick={declineUser}>
            Are you sure?
          </Button>
        ) : (
          <Button
            variant="outline"
            onClick={() =>
              setConfirm((prevState) => {
                const newConfirm = [...prevState];
                newConfirm[index] = true;
                return newConfirm;
              })
            }
          >
            Decline
          </Button>
        )}
        <Button variant="default" onClick={approveUser}>
          Approve
        </Button>
      </div>
    </div>
  );
}
