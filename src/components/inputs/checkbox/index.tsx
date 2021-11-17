import { InputHTMLAttributes, forwardRef } from 'react';
import { Label, UI } from './styled';

export const Checkbox = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & {
    className?: string;
  }
>(({ className, value, checked, onChange, children, ...rest }, ref) => (
  <Label className={className}>
    <input
      type="checkbox"
      value={value}
      checked={checked}
      onChange={onChange}
      {...rest}
      ref={ref}
    />
    <UI />
    <span>{children}</span>
  </Label>
));

export default Checkbox;
