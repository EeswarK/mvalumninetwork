interface CardContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode[];
  onClick?: () => void;
}

export const CardContainer = (props: CardContainerProps) => {
  const [title, body, footer] = props.children;
  return (
    <div
      className="cursor-pointer select-none overflow-hidden rounded-lg shadow-2xl"
      onClick={props.onClick}
    >
      <div className="px-4 pt-4 sm:px-6 sm:pt-5">{title}</div>
      <div className="px-4 py-1 sm:px-6">{body}</div>
      <div className="px-4 pb-4 sm:px-6 sm:pb-5">{footer}</div>
    </div>
  );
};
