import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Booking, UserAuthProps } from "src/types";

const user = JSON.parse(localStorage.getItem("user")!);
const userData: UserAuthProps = user;
export const useListBooking = () => {
  const fetchBookings = async (): Promise<Booking[]> => {
    const { data } = await axios.get("/bookings/", {
      headers: {
        Authorization: `${userData.user.firstName} ${userData.token}`,
      },
    });
    return data;
  };

  const onSuccess = (data: Booking[]) => {
    sessionStorage.setItem("bookings", JSON.stringify(data));
  };

  const {
    isLoading,
    isError,
    data: bookings,
    error,
  } = useQuery(["bookings"], fetchBookings, { onSuccess });

  return { bookings, isError, error, isLoading };
};
