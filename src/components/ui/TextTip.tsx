import clsx from "clsx";

interface TextTipProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  tip: string;
  className?: string;
}
export default function TextTip(props: TextTipProps) {
  const { tip, children, className } = props;

  return (
    <span className="group cursor-default">
      {/* translate values are hard coded, we could just hard code and pass this in for every use if there's no better solution */}
      <div className="absolute z-50  hidden -translate-y-8 -translate-x-16 scale-50 rounded-md bg-zinc-700 px-2 py-1 text-white transition delay-150 ease-in-out  group-hover:block group-hover:scale-100">
        {tip}
      </div>
      <div
        className={clsx(
          "absolute text-violet-500 hover:cursor-pointer group-hover:text-violet-700",
          className
        )}
      >
        {children}
      </div>
    </span>
  );
}
