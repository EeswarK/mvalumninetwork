import clsx from "clsx";

interface TooltipProps {
  tip: string;
  className?: string;
}

export default function Tooltip(props: TooltipProps) {
  const { tip, className } = props;

  return (
    <div className="tooltip" data-tip={tip}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={clsx("h-4 w-4", className)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
        />
      </svg>
    </div>
  );
}
