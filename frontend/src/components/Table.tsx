import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Table({ children, className = '' }: Props) {
  return (
    <div className="w-full">
      <table className={`min-w-full divide-y divide-slate-200 ${className}`}>
        {children}
      </table>
    </div>
  );
}
