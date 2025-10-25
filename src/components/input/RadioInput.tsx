import React from 'react';
import { useTranslation } from 'react-i18next';
import { type DetailedHTMLProps, type ForwardedRef, forwardRef, type InputHTMLAttributes, useRef } from 'react';
import { TRadioOption } from './types';
import { Tooltip } from '../tooltip';

export const RadioInput = forwardRef(
  (
    {
      option = {},
      name,
      value,
      onChange,
      ...props
    }: { option: TRadioOption } & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const { t } = useTranslation();
    const hasTooltipOption = !!option?.tooltip && !!option.tooltip.title;
    const inputRef = useRef<HTMLInputElement | null>(null);

    const radio = (
      <label className={`label-container__label radioBox ${option.className ?? ''}`}>
        <span>{t(option.innerHTML || option.value)}</span>
        <input
          className="label-input__radiobox"
          id={`${option.name}-${option.value}`}
          value={option.value}
          name={option.name || name}
          type="radio"
          onChange={onChange}
          checked={value?.toString?.() === option.value?.toString?.()}
          disabled={option.disabled}
          {...props}
          ref={(node: HTMLInputElement | null) => {
            inputRef.current = node;
            if (ref) {
              if (typeof ref === 'function') ref(node);
              else (ref as any).current = node;
            }
          }}
        />
        <span className="check-mark__radiobox" />
      </label>
    );

    return <>{hasTooltipOption ? <Tooltip {...option.tooltip}>{radio}</Tooltip> : <>{radio}</>}</>;
  },
);
