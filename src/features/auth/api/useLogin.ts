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
  
  //login user post function to mongodb that returns a user object 
  const loginUser = async (data: LoginFormProps): Promise<UserAuthProps> => {
    const response = await axios.post(`${process.env.REACT_APP_LIVE_URL}/user/login`, data);
    return response.data;
  };

  /*on sucess, set the returned user object to a 
  local storage object and move to the homepage*/

  const onSuccess = (data: UserAuthProps) => {
    localStorage.setItem("user", JSON.stringify(data));
    window.location.pathname = "/";
  };

  /*react query mutation object that accepts
  the login function as a parameter */
  const mutation = useMutation(loginUser);


  const onError = (err: any) => {
    setError(err.response.data.error);
  };

  /**submit handler function that accepts user input 
   which the mutate function passes to the login user
   function
   */
  const handleSubmit = (data: LoginFormProps) => {
    mutation.mutate(data, { onSuccess, onError });
  };

  return { handleSubmit, mutation, error };
};
