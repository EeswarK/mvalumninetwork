import { cn } from "@/lib/utils";

interface CardContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode[];
  onClick?: () => void;
}

export const CardContainer = (props: CardContainerProps) => {
  const [title, body, footer] = props.children;
  return (
    <div
      className={cn(
        "cursor-pointer select-none overflow-hidden rounded-lg shadow-2xl",
        props.className
      )}
      onClick={props.onClick}
    >
      <div className="px-4 pt-4 text-center sm:px-6 sm:pt-5">{title}</div>
      <div className="px-4 py-1 text-center sm:px-6">{body}</div>
      <div className="px-4 pb-4 text-center sm:px-6 sm:pb-5">{footer}</div>
    </div>
  );
};
