import { forwardRef, InputHTMLAttributes } from 'react';
import { Button, VisuallyHidden } from '@telegram-apps/telegram-ui';

export interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Text label for the file input, used as the button label. */
  label?: string;
}

/**
 * Renders a file input disguised as a button, enhancing the user interface and improving usability.
 * It leverages the `ButtonCell` component for consistent styling across the application.
 */
export const FileInput = forwardRef<HTMLDivElement, FileInputProps>(
  ({ label = 'Browse files', className, children, ...restProps }, ref) => (
    <div ref={ref} className={className}>
      {children}
      <Button size="s" Component="label">
        <VisuallyHidden>
          <input type="file" placeholder={label} {...restProps} />
        </VisuallyHidden>
        {label}
      </Button>
    </div>
  )
);
