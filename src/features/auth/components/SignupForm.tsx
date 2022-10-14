import { Button, LinkTo } from "src/components";
import { Form } from "src/components/Form/Form";
import { InputField } from "src/components/Form/InputField";
import { useSignup } from "../api/useSignup";

type SignupProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNo: string;
  role?: "admin" | "customer";
};

export const SignupForm = () => {
  const { handleSubmit, error, mutation } = useSignup();
  return (
    <Form
      onSubmit={(data: SignupProps) => handleSubmit(data)}
      className="mb-12"
      options={{ mode: "onBlur" }}
    >
      {({ register, formState }) => (
        <>
          <LinkTo to="/">
            <h1 className="font-bold text-4xl">至福</h1>
            <h1 className="text-2xl">Sign Up</h1>
          </LinkTo>
          {error && !mutation.isLoading && (
            <p className="bg-red-500 text-white px-1 font-medium mt-4">
              {error}
            </p>
          )}
          <InputField
            variant="primary"
            label="First Name"
            registration={register("firstName", {
              required: "Please enter your first name",
            })}
            error={formState.errors["firstName"]}
            type="text"
          />
          <InputField
            variant="primary"
            label="Last Name"
            registration={register("lastName", {
              required: "Please enter your last name",
            })}
            error={formState.errors["lastName"]}
            type="text"
          />
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
            type="email"
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
          <InputField
            variant="primary"
            label="Phone Number"
            registration={register("phoneNo", {
              required: "Please enter your phone number",
              pattern: {
                value: /^\d+$/,
                message: "Please enter a valid phone number",
              },
            })}
            error={formState.errors["phoneNo"]}
            type="text"
          />
          <Button loading={mutation.isLoading} type="submit" variant="primary">
            {!mutation.isLoading || mutation.isError ? "Sign Up" : "Loading..."}
          </Button>
        </>
      )}
    </Form>
  );
};
