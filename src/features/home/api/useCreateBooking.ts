import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { useState } from "react";

type BookingFormProps = {
  checkIn: string;
  checkOut: string;
  bookingPrice: number;
  bookingStatus: "pending" | "approved";
  customerName: string;
  customerPhoneNo: string;
  noOfGuests: number;
  roomType: string;
  roomId: string;
  roomNo: number;
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  const [error, setError] = useState<any>("");
  const queryData = useQuery(["booking"]).data;
  const createBooking = async (data: BookingFormProps) => {
    const response = await axios.post("/bookings", data);
    return response.data;
  };

  const onSuccess = () => {
    queryClient.invalidateQueries(["bookings"]).then(() => {
      sessionStorage.setItem("bookings", JSON.stringify(queryData));
      window.location.pathname = "/";
    });
  };

  const onError = (err: any) => {
    setError(err.response.data.error);
  };

  const handleSubmit = (data: BookingFormProps) => {
    mutation.mutate(data, { onSuccess, onError });
  };

  const mutation = useMutation(createBooking);

  return { mutation, error, handleSubmit };
};
