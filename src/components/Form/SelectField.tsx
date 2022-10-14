import { FieldWrapper, FieldWrapperPassThroughProps } from "./FieldWrapper";
import { UseFormRegisterReturn } from "react-hook-form";

type SelectFieldProps = FieldWrapperPassThroughProps & {
  values: string[];
  registration: Partial<UseFormRegisterReturn>;

  placeHolder?: string;
  name?: string;

  defaultValue?: string;
};
export const SelectField = ({
  label,
  registration,
  values,

  name,

  error,
  defaultValue,
  placeHolder,
}: SelectFieldProps) => {
  return (
    <FieldWrapper label={label} error={error}>
      <select
        placeholder={placeHolder}
        name={name}
        className="border-secondary w-full border p-2 mb-2  bg-primary focus:outline-none focus:border-2  "
        defaultValue={defaultValue}
        {...registration}
      >
        {values.map((value) => (
          <option value={value} key={value}>
            {value}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
};
