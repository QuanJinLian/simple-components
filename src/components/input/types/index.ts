import { TooltipProps } from '../../tooltip/types';
import { InputHTMLAttributes } from 'react';

export type TRadioOption = {
  innerHTML?: any;
  value?: any;
  tooltip?: TooltipProps;
  className?: string;
  name?: string;
  disabled?: boolean;
};

export type TRadioProps = {
  option: TRadioOption;
} & InputHTMLAttributes<HTMLInputElement>;

export type TRadioBoxProps = {
  contents?: string;
  options: TRadioOption[];
} & InputHTMLAttributes<HTMLInputElement>;
