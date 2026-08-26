import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export default function Button({
  children,
  className = "",
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  const baseStyle =
    "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-mint active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  const variants = {
    primary: "bg-brand-navy text-white hover:bg-brand-navy/90 hover:shadow-md hover:-translate-y-0.5",
    secondary: "bg-brand-mint text-brand-navy hover:bg-brand-mint/90 hover:shadow-md hover:-translate-y-0.5 font-semibold",
    outline: "border-2 border-brand-navy text-brand-navy bg-transparent hover:bg-brand-navy hover:text-white hover:-translate-y-0.5",
    ghost: "text-brand-navy bg-transparent hover:bg-brand-canvas",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs font-semibold uppercase tracking-wider",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base font-semibold",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
