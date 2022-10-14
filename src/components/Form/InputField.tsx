import { FieldWrapper, FieldWrapperPassThroughProps } from "./FieldWrapper";
import { UseFormRegisterReturn } from "react-hook-form";

type InputFieldProps = FieldWrapperPassThroughProps & {
  className?: string;
  type: "text" | "email" | "password" | "number" | "date" | "datetime-local";
  placeHolder?: string;
  variant?: keyof typeof variants;
  registration: Partial<UseFormRegisterReturn>;
};

const variants = {
  primary:
    "border-secondary w-full border p-2 mb-2  bg-primary focus:outline-none focus:border-2",
  secondary:
    "border-b-secondary w-full border-b text-xl mb-2  bg-primary focus:outline-none focus:border-b-2",
};

export const InputField = ({
  type = "text",
  className,
  label,
  registration,
  error,
  variant,
  placeHolder,
}: InputFieldProps) => {
  return (
    <FieldWrapper label={label} error={error}>
      {variant ? (
        <input
          type={type}
          className={variants[variant!]}
          {...registration}
          placeholder={placeHolder}
        />
      ) : (
        <input
          type={type}
          className={className}
          {...registration}
          placeholder={placeHolder}
        />
      )}
    </FieldWrapper>
  );
};
