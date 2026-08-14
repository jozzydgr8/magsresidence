import { JSX } from "react";

type ButtonProps = {
  title?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | (() => void);
  className?: string;
  disabled?: boolean;
  icon?: JSX.Element;
  children?: JSX.Element;
  type?: "button" | "submit" | "reset";
};

export const FlatButton = ({
  children,
  title,
  onClick,
  className,
  disabled,
  icon,
  type = "button",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
      disabled={disabled}
    >
      {title} {children} {icon}
    </button>
  );
};