import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import UserBlock from "./UserBlock";

export default function UnapprovedUsers() {
  const users = api.users.getAllUnapprovedUsers.useQuery();
  const [confirm, setConfirm] = useState<boolean[]>([]);
  const [approved, setApproved] = useState<boolean[]>([]);

  useEffect(() => {
    if (users.data) {
      setConfirm(users.data.map(() => false));
      setApproved(users.data.map(() => false));
    }
  }, [users.data]);

  useEffect(() => {
    void users.refetch();
  }, [users]);

  return (
    <div className="">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Unapproved Users
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          As an admin, you can approve or reject users here. Use your brain.
        </p>
      </div>
      {users.data && (
        <div className="divide-y divide-gray-900 ">
          {users.data.map(
            (user, index) =>
              !approved[index] && (
                <UserBlock
                  key={user.id}
                  user={user}
                  confirm={confirm[index]}
                  setConfirm={setConfirm}
                  approved={approved[index]}
                  setApproved={setApproved}
                  index={index}
                />
              )
          )}
        </div>
      )}
    </div>
  );
}
