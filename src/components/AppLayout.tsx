import { useRouter } from "next/router";
import { NavBar } from "./NavBar";

export function AppLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  const router = useRouter();
  const isHomePage = router.pathname === "/";
  const isNoNavBarPage =
    router.pathname === "/signin" || router.pathname === "/signup";

  return (
    <div className="min-h-screen bg-zinc-100">
      {!isNoNavBarPage && <NavBar />}
      {children}
    </div>
  );
}
