import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', ...props }, ref) => {
    let baseStyles = "inline-flex items-center justify-center rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    
    let variants = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 font-medium shadow-sm",
      secondary: "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 px-4 py-2 font-medium shadow-sm",
      ghost: "hover:bg-gray-100 text-gray-700 px-3 py-2",
      icon: "p-2 hover:bg-gray-100 text-gray-500 rounded-lg transition-colors"
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
