import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Booking } from "src/types";
import { useState } from "react";

export const useCreateBooking = () => {
  const [error, setError] = useState<any>("");
  const createBooking = async (data: Partial<Booking>) => {
    const response = await axios.post("/bookings", data);
    return response.data;
  };

  const queryClient = useQueryClient();
  const queryData = useQuery(["bookings"]).data;

  const onSuccess = () => {
    queryClient.invalidateQueries(["bookings"]).then(() => {
      sessionStorage.setItem("bookings", JSON.stringify(queryData))
    })
    window.location.pathname = "/dashboard/bookings";
  };

  const onError = (err: any) => {
    setError(err.response.data.error);
  };

  const mutation = useMutation(createBooking, { onSuccess, onError });

  return { mutation, error };
};
