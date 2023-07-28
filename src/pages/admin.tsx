import { Layout } from "@components/layout";
import UnapprovedUsers from "@components/screens/settings/UnapprovedUsers";

export default function Admin() {
  return (
    <Layout className="mt-8 flex flex-col items-center justify-center space-y-8">
      <UnapprovedUsers />
    </Layout>
  );
}
