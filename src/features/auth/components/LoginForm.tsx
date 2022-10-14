import { Button, Form, InputField, LinkTo } from "src/components";
import { useLogin } from "../api/useLogin";

type LoginFormProps = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const { handleSubmit, mutation, error } = useLogin();

  return (
    <>
      <LinkTo
        to="/"
        className="focus:outline-none focus:[&*>h1]:text-secondary"
      >
        <h1 className="font-bold text-4xl">至福</h1>
        <h2 className="text-2xl font-medium opacity-80">Log In</h2>
      </LinkTo>

      <Form
        onSubmit={(data: LoginFormProps) => handleSubmit(data)}
        options={{ mode: "onBlur" }}
      >
        {({ register, formState }) => (
          <>
            {error && !mutation.isLoading && (
              <p className="bg-red-500 text-white px-1 font-medium mt-4">
                {error}
              </p>
            )}
            <InputField
              variant="primary"
              label="Email"
              registration={register("email", {
                required: "Please enter your email",
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Please enter a valid email",
                },
              })}
              error={formState.errors["email"]}
              type="text"
            />
            <InputField
              variant="primary"
              label="Password"
              registration={register("password", {
                required: "Please enter your password",
              })}
              error={formState.errors["password"]}
              type="password"
            />
            <Button
              loading={mutation.isLoading}
              type="submit"
              variant="primary"
            >
              {!mutation.isLoading || mutation.isError
                ? "Log In"
                : "Loading..."}
            </Button>
            <p className="w-1/2 mt-4 opacity-80 font-medium">
              * admin only dashboard. contact the head administrator for
              registration.
            </p>
          </>
        )}
      </Form>
    </>
  );
};
