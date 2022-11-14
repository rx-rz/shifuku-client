import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Booking } from "src/types";
import { useState } from "react";
import { useBookingStore } from "src/store/useBookingStore";

export const useCreateBooking = () => {
  const [error, setError] = useState<any>("");

  const addBooking = useBookingStore((state) => state.addBooking);

  /**create booking object in database, add
   * to zustand store and then return it as an object */
  const createBooking = async (data: Partial<Booking> | Booking) => {
    const response = await axios.post(
      `${process.env.REACT_APP_LIVE_URL}/bookings`,
      data
    );
    addBooking(response.data);
    return response.data;
  };

  const queryClient = useQueryClient();
  const queryData = useQuery(["bookings"]).data;

  /**invalidate queries on success and reset the */
  const onSuccess = () => {
    queryClient.invalidateQueries(["bookings"]).then(() => {
      sessionStorage.setItem("bookings", JSON.stringify(queryData));
    });
  };

  const onError = (err: any) => {
    setError(err.response.data.error);
  };

  
  const mutation = useMutation(createBooking, { onSuccess, onError });

  return { mutation, error };
};
