import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
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

  const successToast = () =>
    toast.success("Booking made successfully.", {
      duration: 2500,
      position: "top-center",
      style: {
        border: "1px solid purple",
        backgroundColor: "white",
      },
    });

  const errorToast = () =>
    toast.error("An error occured. Please try again.", {
      duration: 2500,
      position: "top-center",
      style: {
        border: "1px solid purple",
        backgroundColor: "white",
      },
    });

  const createBooking = async (data: BookingFormProps) => {
    const response = await axios.post(
      `${process.env.REACT_APP_LIVE_URL}/bookings`,
      data
    );
    return response.data;
  };

  const onSuccess = (data: Booking) => {
    queryClient
      .invalidateQueries(["bookings"])
      .then(() => {
        addBooking(data);
      })
      .then(() => {
        successToast();
      });
    setTimeout(() => window.location.pathname === "/", 1500);
  };

  const onError = (err: any) => {
    setError(err.response.data.error);
    errorToast();
  };

  const handleSubmit = (data: BookingFormProps) => {
    mutation.mutate(data, { onSuccess, onError });
  };

  const mutation = useMutation(createBooking);

  return { mutation, error, handleSubmit };
};
