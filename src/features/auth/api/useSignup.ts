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

  //sign up user post function to mongodb that returns a user object
  const signupUser = async (data: SignupProps): Promise<UserAuthProps> => {
    const response = await axios.post(
      `${process.env.REACT_APP_LIVE_URL}/user/signup`,
      data
    );
    return response.data;
  };

  /*on sucess, set the returned user object to a 
  local storage object and move to the homepage*/
  const onSuccess = (data: UserAuthProps) => {
    localStorage.setItem("user", JSON.stringify(data));
    window.location.pathname = "/";
  };

  const onError = (err: any) => {
    setError(err.response.data.error);
  };

  /*react query mutation object that accepts
  the signup, success and failute function parameters */
  const mutation = useMutation(signupUser, { onSuccess, onError });

  /**submit handler function that accepts user input 
   which the mutate function passes to the sign up user
   function
   */
  const handleSubmit = (data: SignupProps) => {
    mutation.mutate({ ...data, role: "admin" });
  };
  return { mutation, handleSubmit, error };
};
