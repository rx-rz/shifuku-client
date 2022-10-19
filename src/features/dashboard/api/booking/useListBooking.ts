import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useBookingStore } from "src/store/useBookingStore";
import { Booking, UserAuthProps } from "src/types";

const user = JSON.parse(localStorage.getItem("user")!);
const userData: UserAuthProps = user;
export const useListBooking = () => {
  const setBookings = useBookingStore((state) => state.setBookings);
  const fetchBookings = async (): Promise<Booking[]> => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_LIVE_URL}/bookings`,
      {
        headers: {
          Authorization: `${userData.user.firstName} ${userData.token}`,
        },
      }
    );
    return data;
  };

  const onSuccess = (data: Booking[]) => {
    setBookings(data);
  };

  const {
    isLoading,
    isError,
    data: bookings,
    error,
  } = useQuery(["bookings"], fetchBookings, { onSuccess });

  return { bookings, isError, error, isLoading };
};
