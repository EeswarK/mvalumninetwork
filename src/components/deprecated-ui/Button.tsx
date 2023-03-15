import React from "react";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import Link from "next/link";
import clsx from "clsx";

const buttonStyles = cva(
  "inline-flex items-center | border | text-sm font-medium | shadow-sm focus:outline-none ",
  {
    variants: {
      size: {
        xs: "px-2.5 py-1.5 | text-xs",
        sm: "px-3 py-2 | text-sm",
        md: "px-4 py-2 | text-sm",
        lg: "px-4 py-2 | text-base",
        xl: "px-6 py-3 | text-base",
      },
      intent: {
        primary:
          "bg-violet-700 hover:bg-violet-800 text-white | border-transparent focus:ring-2 focus:ring-offset-2 focus:ring-violet-500",
        secondary:
          "text-violet-700 bg-violet-100 hover:bg-violet-200 | border-transparent focus:ring-2 focus:ring-offset-2 focus:ring-violet-500",
        tertiary: "bg-white hover:bg-gray-50 | text-gray-700 | border-gray-300",
        approve: "bg-green-700 hover:bg-green-800 text-white",
        decline: "bg-red-400 hover:bg-red-500 text-white",
      },
      rounded: {
        none: "rounded-none",
        md: "rounded-lg",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      size: "md",
      intent: "primary",
      rounded: "md",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  intent?: "primary" | "secondary" | "tertiary" | "approve" | "decline";
  rounded?: "none" | "md" | "full";
  href?: string;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { size, intent, rounded, href, className, ...restProps } = props;

  if (href) {
    return (
      <Link href={href}>
        <button
          className={clsx(buttonStyles({ size, intent, rounded }), className)}
          {...restProps}
        >
          {props.children}
        </button>
      </Link>
    );
  }

  return (
    <button
      className={clsx(buttonStyles({ size, intent, rounded }), className)}
      {...restProps}
    >
      {props.children}
    </button>
  );
};
