import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useBookingStore } from "src/store/useBookingStore";
import { Booking, UserAuthProps } from "src/types";

const user = JSON.parse(localStorage.getItem("user")!);
const userData: UserAuthProps = user;

export const useDeleteBooking = () => {
  
  const deleteBookingStore = useBookingStore((state) => state.deleteBooking);

  const deleteBooking = async (id: string) => {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_LIVE_URL}/bookings/${id}`,
      {
        headers: {
          Authorization: `${userData.user.firstName} ${userData.token}`,
        },
      }
    );
    return data;
  };

  const queryClient = useQueryClient();

  const onSuccess = (data: Booking) => {
    queryClient.invalidateQueries(["bookings"]).then(() => {
      deleteBookingStore(data._id);
      window.location.pathname = "/dashboard/bookings";
    });
  };
  const mutation = useMutation(deleteBooking, { onSuccess });

  const handleBookingDelete = (id: string) => {
    mutation.mutate(id);
  };

  return { handleBookingDelete, mutation };
};
