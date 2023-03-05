import { api } from "@/utils/api";

export default function useAuthProvider() {
  const { data: authProvider } = api.users.getAuthProvider.useQuery();

  let firstAuthProvider;
  if (authProvider) {
    firstAuthProvider = authProvider[0]?.provider;
  } else {
    firstAuthProvider = "loading...";
  }

  return firstAuthProvider;
}
