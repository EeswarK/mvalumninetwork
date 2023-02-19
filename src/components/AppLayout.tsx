import { useRouter } from "next/router";
import Footer from "./Footer";
import { NavBar } from "./NavBar";

export function AppLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  const router = useRouter();
  const isNoNavBarPage =
    router.pathname === "/signin" || router.pathname === "/signup";

  return (
    <div className="min-h-screen">
      {!isNoNavBarPage && <NavBar />}
      {children}
      <Footer />
    </div>
  );
}
