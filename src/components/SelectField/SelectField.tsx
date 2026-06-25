import React from 'react';

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  id,
  label,
  error,
  children,
  className = '',
  ...props
}) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        className={`${error ? 'error-input' : ''} ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};
