import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useBookingStore } from "src/store/useBookingStore";
import { Booking, UserAuthProps } from "src/types";

const user = JSON.parse(localStorage.getItem("user")!);
const userData: UserAuthProps = user;

export const useAcceptBooking = () => {
  const acceptBookingStore = useBookingStore((state) => state.acceptBooking);
  const acceptBooking = async (props: {
    id: string;
    roomId: string;
  }): Promise<Booking> => {
    const { data } = await axios.patch(
      `${process.env.REACT_APP_LIVE_URL}/bookings/${props.id}`,
      {
        bookingStatus: "approved",
      },
      {
        headers: {
          Authorization: `${userData.user.firstName} ${userData.token}`,
        },
      }
    );
    return data;
  };
  const queryClient = useQueryClient();

  const onError = () => {
  
  };

  const onSuccess = (data: Booking) => {
    queryClient.invalidateQueries(["bookings"]).then(() => {
      acceptBookingStore(data._id);
    });
  };

  const mutation = useMutation(acceptBooking, { onSuccess, onError });

  const handleSubmit = (props: { id: string; roomId: string }) => {
    mutation.mutate(props);
  };

  return { handleSubmit, mutation };
};
