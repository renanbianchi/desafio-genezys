import { cn } from '@/lib/utils';
import { Label } from '@radix-ui/react-label';
import { forwardRef } from 'react';
import InputMask from '@mona-health/react-input-mask';

type InputProps = {
  label?: string;
  description?: string;
  optional?: boolean;
  mask?: string;
  errorMessage?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      label,
      id,
      description,
      optional,
      mask,
      errorMessage,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-row gap-1">
          {label && (
            <Label htmlFor={`${id}`} className="text-sm text-black select-none">
              {label}
            </Label>
          )}
          {optional && (
            <span className="text-sm text-slate-500 text-opacity-50 select-none">
              {' '}
              - Opcional
            </span>
          )}
          {errorMessage && (
            <span className="text-sm text-red-500 select-none">
              {errorMessage}
            </span>
          )}
        </div>
        {mask ? (
          <InputMask mask={mask} {...props}>
            <input
              type={type}
              className={cn(
                `flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${errorMessage ? 'border-2 border-red-500' : 'border-input'}`,
                className,
              )}
              ref={ref}
              {...props}
            />
          </InputMask>
        ) : (
          <input
            type={type}
            className={cn(
              `flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${errorMessage ? 'border-2 border-red-500' : 'border-input'}`,
              className,
            )}
            ref={ref}
            {...props}
          />
        )}
        {description && (
          <span className="text-sm text-muted-foreground select-none">
            {description}
          </span>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
