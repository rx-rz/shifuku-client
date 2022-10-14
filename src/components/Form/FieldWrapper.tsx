import { FieldError } from "react-hook-form";

export type FieldWrapperProps = {
  label: string;
  children: React.ReactNode;
  error?: FieldError | undefined;
};

export type FieldWrapperPassThroughProps = Omit<FieldWrapperProps, "children">;

export const FieldWrapper = ({ label, children, error }: FieldWrapperProps) => {
  return (
    <div className="mt-1 flex-col w-full">
      <label className="flex flex-col font-general_sans w-full">
        {window.location.pathname !== "/booking" ? (
          <span className="text-xl font-medium mb-1 mt-8 opacity-90">
            {label}
          </span>
        ) : (
          <span className="text-xl font-medium mb-1 opacity-90">{label}</span>
        )}
        <>{children}</>
      </label>
      <p className="mt-1 font-medium text-red-500">{error && error.message}</p>
    </div>
  );
};
