import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useBookingStore } from "src/store/useBookingStore";
import { Booking, UserAuthProps } from "src/types";
import { errorToast, successToast } from "src/utils/toasts";

const user = JSON.parse(localStorage.getItem("user")!);
const userData: UserAuthProps = user;

export const useAcceptBooking = () => {
  //initializing zustand booking store function for editing client state when a booking is accepted
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
    errorToast("An error occured. Please try again.");
  };

  /*on success, call on the zustand booking store function
  to update client state using the id of the edited booking 
  as a parameter. generate a toast to inform the admin of 
  the success and then redirect back to the bookings 
  dashboard after 1.5 seconds */
  const onSuccess = (data: Booking) => {
    acceptBookingStore(data._id);
    successToast("Booking accepted.");
    queryClient.invalidateQueries(["bookings"]).then(() => {
      setTimeout(
        () => (window.location.pathname = "/dashboard/bookings"),
        1500
      );
    });
  };

  /*react query mutation object that accepts
  the acceptBooking, success and failure function as parameters */
  const mutation = useMutation(acceptBooking, { onSuccess, onError });

  /**submit handler function that accepts user input 
   which the mutate function passes to the accept booking
   function
   */
  const handleSubmit = (props: { id: string; roomId: string }) => {
    mutation.mutate(props);
  };

  return { handleSubmit, mutation };
};
