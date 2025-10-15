import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'success';
  children: React.ReactNode;
};

const variantMap: Record<string, string> = {
  primary: 'bg-primary hover:bg-primary-dark text-white',
  secondary: 'bg-slate-200 hover:bg-slate-300 text-slate-800',
  danger: 'bg-danger hover:bg-danger-dark text-white',
  ghost: 'bg-transparent text-primary hover:bg-primary-light',
  success: 'bg-accent hover:bg-accent-dark text-white',
};

export default function Button({ variant = 'primary', className = '', children, ...rest }: Props) {
  return (
    <button
      {...rest}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${variantMap[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
