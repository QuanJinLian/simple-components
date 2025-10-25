import React from 'react';
import { InputHTMLAttributes } from 'react';

export const TableCheckbox = ({
  className,
  text,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { text?: string | number }) => {
  return (
    <label className={`ikea-table-checkbox-wrapper ${className ?? ''}`} onClick={e => e.stopPropagation()}>
      <span className="ikea-table-checkbox-span">
        <input className="ikea-table-checkbox" type="checkbox" {...props} />
        <span className="ikea-table-checkbox-inner"></span>
      </span>
      {text && <span className="ikea-table-checkbox-text">{text}</span>}
    </label>
  );
};
