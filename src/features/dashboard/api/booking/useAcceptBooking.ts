import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Booking, UserAuthProps } from "src/types";

const user = JSON.parse(localStorage.getItem("user")!);
const userData: UserAuthProps = user;

export const useAcceptBooking = () => {
  const acceptBooking = async (props: {
    id: string;
    roomId: string;
  }): Promise<Booking> => {
    const response = await axios.patch(
      `/bookings/${props.id}`,
      {
        bookingStatus: "approved",
      },
      {
        headers: {
          Authorization: `${userData.user.firstName} ${userData.token}`,
        },
      }
    );
    return response.data;
  };
  const queryClient = useQueryClient();
  const queryData = useQuery(["bookings"]).data;

  const onSuccess = () => {
    queryClient.invalidateQueries(["bookings"]).then(() => {
      sessionStorage.setItem("bookings", JSON.stringify(queryData));
      window.location.reload();
    });
  };

  const mutation = useMutation(acceptBooking, { onSuccess });

  const handleSubmit = (props: { id: string; roomId: string }) => {
    mutation.mutate(props);
  };

  return { handleSubmit, mutation };
};
