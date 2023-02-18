import { useRouter } from "next/router";
import { NavBar } from "./ui/NavBar";

export function AppLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  const router = useRouter();
  const isHomePage = router.pathname === "/";
  const isNoNavBarPage =
    router.pathname === "/signin" || router.pathname === "/signup";

  return (
    <>
      {!isNoNavBarPage && <NavBar />}
      {children}
    </>
  );
}
