import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useBookingStore } from "src/store/useBookingStore";
import { Booking, UserAuthProps } from "src/types";

const user = JSON.parse(localStorage.getItem("user")!);
const userData: UserAuthProps = user;


// Custom hook that provides functionality for listing bookings
export const useListBooking = () => {
  // Access the `setBookings` state from the global `useBookingStore` hook
  const setBookings = useBookingStore((state) => state.setBookings);

  // Function to fetch bookings by making a GET request to the API
  const fetchBookings = async (): Promise<Booking[]> => {
    // Make a GET request to the API
    const { data } = await axios.get(
      `${process.env.REACT_APP_LIVE_URL}/bookings`,
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

  // Callback function to be invoked when the fetch query is successful
  const onSuccess = (data: Booking[]) => {
    // Update the global `setBookings` state with the fetched bookings
    setBookings(data);
  };

  const {
    isLoading,
    isError,
    data: bookings,
    isFetching, 
    error,
  } = useQuery(["bookings"], fetchBookings, { onSuccess });

  // Return the `bookings`, `isError`, `error`, `isLoading`, and `isFetching` values for use in the component
  return { bookings, isError, error, isLoading, isFetching };
};
