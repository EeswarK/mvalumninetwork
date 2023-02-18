import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="text-3xl font-semibold text-zinc-900">
      <span className="sr-only">Home</span>
      <span>
        <span className="text-violet-700">MV</span> Network
      </span>
    </Link>
  );
}
