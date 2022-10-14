import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

type LoginFormProps = {
  email: string;
  password: string;
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
    role: "customer" | "admin";
    updatedAt: string;
    __v: number;
    _id: string;
  };
};



export const useLogin = () => {

  const [error, setError] = useState<any>("");
  
  const loginUser = async (data: LoginFormProps): Promise<UserAuthProps> => {
    const response = await axios.post("/user/login", data);
    return response.data;
  };

  const onSuccess = (data: UserAuthProps) => {
    localStorage.setItem("user", JSON.stringify(data));
    window.location.pathname = "/";
  };

  const mutation = useMutation(loginUser);

  const onError = (err: any) => {
    setError(err.response.data.error);
  };

  const handleSubmit = (data: LoginFormProps) => {
    mutation.mutate(data, { onSuccess, onError });
  };

  return { handleSubmit, mutation, error };
};
