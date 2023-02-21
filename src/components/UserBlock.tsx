import { api } from "@/utils/api";
import type { User } from "@prisma/client";
import { Button } from "./ui/Button";

export default function UserBlock({
  user,
  confirm,
  setConfirm,
  actionTaken,
  setActionTaken,
  index,
}: {
  user: User;
  confirm?: boolean;
  setConfirm: React.Dispatch<React.SetStateAction<boolean[]>>;
  actionTaken?: boolean;
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
    <div key={user.id} className="flex justify-between py-3">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          {user.name}
        </h3>
        <p className="mt-1 text-sm text-gray-500">{user.email}</p>
      </div>
      <div className="space-x-4">
        {confirm ? (
          <Button intent="tertiary" onClick={declineUser}>
            Are you sure?
          </Button>
        ) : (
          <Button
            intent="tertiary"
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
        <Button intent="approve" onClick={approveUser}>
          Approve
        </Button>
      </div>
    </div>
  );
}
