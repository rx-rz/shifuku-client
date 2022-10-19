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
    const {data} = await axios.patch(
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
  const queryData = useQuery(["bookings"]).data;

  const onError = () => {
    // console.log(queryData)
  }
  const onSuccess = () => {
    // console.log(queryData)
    queryClient.invalidateQueries(["bookings"]).then(() => {
      console.log(queryData)
      // sessionStorage.setItem("bookings", JSON.stringify(queryData));
      // window.location.reload();
    });
  };

  const mutation = useMutation(acceptBooking, { onSuccess, onError });

  const handleSubmit = (props: { id: string; roomId: string }) => {
    mutation.mutate(props);
  };

  return { handleSubmit, mutation };
};
