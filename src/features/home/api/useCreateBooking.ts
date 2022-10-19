import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { useState } from "react";
import { useBookingStore } from "src/store/useBookingStore";
import { Booking } from "src/types";

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
  const addBooking = useBookingStore((state) => state.addBooking);

  const createBooking = async (data: BookingFormProps) => {
    const response = await axios.post(
      `${process.env.REACT_APP_LIVE_URL}/bookings`,
      data
    );
    return response.data;
  };

  const onSuccess = (data: Booking) => {
    queryClient.invalidateQueries(["bookings"]).then(() => {
      addBooking(data);
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
