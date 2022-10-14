import {
  FieldValues,
  SubmitHandler,
  UseFormReturn,
  UseFormProps,
  useForm,
} from "react-hook-form";

type FormProps<TFormValues extends FieldValues> = {
  className?: string;
  onSubmit: SubmitHandler<TFormValues>;
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
  options?: UseFormProps<TFormValues>;
};

export const Form = <TFormValues extends Record<string, any>>({
  className,
  onSubmit,
  children,
  options,
}: FormProps<TFormValues>) => {
  const methods = useForm<TFormValues>({ ...options });
  return (
    <form className={className} onSubmit={methods.handleSubmit(onSubmit)}>
      {children(methods)}
    </form>
  );
};
