import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useBookingStore } from "src/store/useBookingStore";
import { Booking, UserAuthProps } from "src/types";

const user = JSON.parse(localStorage.getItem("user")!);
const userData: UserAuthProps = user;

// Custom hook that provides functionality for deleting bookings
export const useDeleteBooking = () => {
  // Access the `deleteBooking` state from the global `useBookingStore` hook
  const deleteBookingStore = useBookingStore((state) => state.deleteBooking);

  // Function to delete a booking by making a DELETE request to the API
  const deleteBooking = async (id: string) => {
    // Make a DELETE request to the API with the specified `id`
    const { data } = await axios.delete(
      `${process.env.REACT_APP_LIVE_URL}/bookings/${id}`,
      {
        headers: {
          // Send the authorization header with the user's first name and token
          Authorization: `${userData.user.firstName} ${userData.token}`,
        },
      }
    );
    // Return the response data
    return data;
  };

  // Access the global `useQueryClient` hook
  const queryClient = useQueryClient();

  // Callback function to be invoked when the delete mutation is successful
  const onSuccess = (data: Booking) => {
    // Invalidate the "bookings" query in the cache
    queryClient.invalidateQueries(["bookings"]).then(() => {
      // Update the global `deleteBooking` state with the deleted booking's `_id`
      deleteBookingStore(data._id);
      // Redirect the user to the "/dashboard/bookings" page
      window.location.pathname = "/dashboard/bookings";
    });
  };
  // Use the `useMutation` hook to perform the delete mutation, with the `onSuccess` callback
  const mutation = useMutation(deleteBooking, { onSuccess });

  // Function to handle deleting a booking
  const handleBookingDelete = (id: string) => {
    // Trigger the delete mutation with the specified `id`
    mutation.mutate(id);
  };

  // Return the `handleBookingDelete` and `mutation` functions for use in the component
  return { handleBookingDelete, mutation };
};
