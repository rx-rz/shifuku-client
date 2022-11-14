import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Booking, UserAuthProps } from "src/types";


const user = JSON.parse(localStorage.getItem("user")!);
const userData: UserAuthProps = user;
export const useBookingDetails = (id: string) => {
  /*fetch booking details using  the booking id  */
  const fetchOneBooking = async (): Promise<Booking> => {
    const { data } = await axios.get(`${process.env.REACT_APP_LIVE_URL}/bookings/${id}`, {
      headers: {
        Authorization: `${userData.user.firstName} ${userData.token}`,
      },
    });
    return data;
  };

  const {
    isLoading,
    isError,
    data: booking,
    error,
  } = useQuery(["booking"], fetchOneBooking);

  return { booking, isError, error, isLoading };
};
