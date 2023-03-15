import { cn } from "@/lib/utils";
import { useRouter } from "next/router";
import { ThemeProvider } from "./theme-provider";
import Footer from "./Footer";
import { NavBar } from "./NavBar";

export function AppShell(props: { children: React.ReactNode }) {
  const { children } = props;

  const router = useRouter();
  const isNoNavBarPage =
    router.pathname === "/signin" ||
    router.pathname === "/onboarding/[[...step]]";

  return (
    <div
      className={cn(
        "min-h-screen bg-white font-sans text-slate-900 antialiased dark:bg-slate-900 dark:text-slate-50"
      )}
    >
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="relative flex min-h-screen flex-col">
          {!isNoNavBarPage && <NavBar />}
          <div className="">{children}</div>
          {!isNoNavBarPage && <Footer />}
        </div>
      </ThemeProvider>
    </div>
  );
}
