import { Link } from "react-router-dom";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const VARIANT_CLASS: Record<Variant, string> = {
  primary: "bg-primary text-white shadow-primary hover:bg-primary-dark hover:-translate-y-0.5",
  secondary: "bg-white text-cafe border border-gray-200 hover:bg-cream",
  ghost: "text-warm hover:text-primary",
};

const SIZE_CLASS: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = CommonProps &
  Omit<ComponentProps<"button">, "className"> & { to?: undefined };

type ButtonAsLink = CommonProps &
  Omit<ComponentProps<typeof Link>, "to" | "className"> & { to: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export default function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", children, className = "" } = props;
  const classes = `btn ${VARIANT_CLASS[variant]} ${SIZE_CLASS[size]} ${className}`;

  if (props.to !== undefined) {
    const {
      to,
      variant: linkVariant,
      size: linkSize,
      children: linkChildren,
      className: linkClassName,
      ...rest
    } = props;
    void linkVariant;
    void linkSize;
    void linkChildren;
    void linkClassName;
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const {
    variant: buttonVariant,
    size: buttonSize,
    children: buttonChildren,
    className: buttonClassName,
    to: buttonTo,
    ...rest
  } = props as ButtonAsButton;
  void buttonVariant;
  void buttonSize;
  void buttonChildren;
  void buttonClassName;
  void buttonTo;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
