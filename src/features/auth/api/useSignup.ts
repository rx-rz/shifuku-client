import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
type SignupProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNo: string;
  role?: "admin" | "customer";
};

type UserAuthProps = {
  token: string;
  user: {
    createdAt: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    phoneNo: string;
    role: "admin";
    updatedAt: string;
    __v: number;
    _id: string;
  };
};

export const useSignup = () => {
  const [error, setError] = useState<any>("");
  const onSuccess = (data: UserAuthProps) => {
    localStorage.setItem("user", JSON.stringify(data));
    window.location.pathname = "/";
  };

  const onError = (err: any) => {
    setError(err.response.data.error);
  };

  const signupUser = async (data: SignupProps): Promise<UserAuthProps> => {
    const response = await axios.post("/user/signup", data);
    return response.data;
  };

  const mutation = useMutation(signupUser, { onSuccess, onError });

  const handleSubmit = (data: SignupProps) => {
    mutation.mutate({ ...data, role: "admin" });
  };
  return { mutation, handleSubmit, error };
};
