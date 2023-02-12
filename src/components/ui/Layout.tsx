import React from "react";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import clsx from "clsx";

const layoutStyles = cva("max-w-7xl mx-auto", {
  variants: {
    narrow: {
      true: "max-w-3xl mx-auto",
      false: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
    },
  },
  defaultVariants: {
    narrow: false,
  },
});

interface LayoutProps
  extends React.ButtonHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof layoutStyles> {
  narrow?: boolean;
}

export const Layout: React.FC<LayoutProps> = (props) => {
  const { narrow, className } = props;

  return (
    <div className={clsx(layoutStyles(), className)}>
      <div className={layoutStyles({ narrow })}>{props.children}</div>
    </div>
  );
};
