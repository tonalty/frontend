import { Control, Controller, ControllerProps, FieldValues } from 'react-hook-form';

import { setNumberInputValue } from '@/utils/setNumberInputValue';
import { Input, InputProps } from '../telegram-ui';

interface Props<T extends FieldValues>
  extends Omit<ControllerProps<T>, 'render'>,
    Omit<InputProps, 'defaultValue' | 'name'> {
  control: Control<T>;
}

export const ControllerNumber = <T extends FieldValues>({
  name,
  defaultValue,
  control,
  ...rest
}: Props<T>) => (
  <Controller
    name={name}
    defaultValue={defaultValue}
    control={control}
    render={({ field }) => (
      <Input
        {...field}
        {...rest}
        onChange={(e) => {
          const { value, notShow, floatValue } = setNumberInputValue(e.target.value);
          if (!isNaN(floatValue) && !notShow) field.onChange(value);
        }}
      />
    )}
  />
);
