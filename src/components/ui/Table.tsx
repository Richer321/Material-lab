import React from 'react';
import { cn } from '@/lib/utils/cn';

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export const Table: React.FC<TableProps> = ({ children, className }) => {
  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="min-w-full divide-y divide-gray-200">{children}</table>
    </div>
  );
};

export const TableHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return <thead className={cn('bg-gray-50', className)}>{children}</thead>;
};

export const TableBody: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return <tbody className={cn('bg-white divide-y divide-gray-200', className)}>{children}</tbody>;
};

export const TableRow: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return <tr className={cn('hover:bg-gray-50', className)}>{children}</tr>;
};

export const TableCell: React.FC<{
  children: React.ReactNode;
  className?: string;
  isHeader?: boolean;
}> = ({ children, className, isHeader = false }) => {
  const Tag = isHeader ? 'th' : 'td';
  return (
    <Tag
      className={cn(
        isHeader
          ? 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
          : 'px-6 py-4 whitespace-nowrap text-sm text-gray-900',
        className
      )}
    >
      {children}
    </Tag>
  );
};
