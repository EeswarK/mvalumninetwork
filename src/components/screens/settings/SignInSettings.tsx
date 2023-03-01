import { api } from "@/utils/api";
import { useSession } from "next-auth/react";

export default function SignInSettings() {
  const session = useSession();

  if (session.status === "loading") return null;
  if (session.data === null) return null;

  const { data: user } = api.users.get.useQuery({ id: session.data.user.id });
  return (
    <>
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Sign In Details
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          This information will be displayed publicly so be careful what you
          share.
        </p>
        <div>
          <span>{}</span>
        </div>
      </div>
    </>
  );
}
