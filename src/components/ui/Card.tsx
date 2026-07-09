import React from 'react';

export function Card({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`bg-[#151A27] border border-[#1E2532] rounded-xl p-5 ${className}`} {...props}>
      {children}
    </div>
  );
}
