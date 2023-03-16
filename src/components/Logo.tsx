import Link from "next/link";
import { useRouter } from "next/router";

export function Logo() {
  const router = useRouter();

  return (
    <Link
      onClick={() => router.replace("/")}
      href="/"
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className="font-display text-3xl font-medium text-zinc-900"
    >
      <span className="sr-only">Home</span>
      <span>
        <span className="text-violet-700">MV</span> Network
      </span>
    </Link>
  );
}
