import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { UserAuthProps } from "src/types";

const user = JSON.parse(localStorage.getItem("user")!);
const userData: UserAuthProps = user;
export const useDeleteBooking = () => {
  const deleteBooking = async (id: string) => {
    const { data } = await axios.delete(`/bookings/${id}`, {
      headers: {
        Authorization: `${userData.user.firstName} ${userData.token}`,
      },
    });
    return data;
  };

  const queryClient = useQueryClient();
  const queryData = useQuery(["bookings"]).data;

  const onSuccess = () => {
    queryClient.invalidateQueries(["bookings"]).then(() => {
      sessionStorage.setItem("bookings", JSON.stringify(queryData));
      if (window.location.pathname !== "/dashboard/bookings") {
        window.location.pathname = "/dashboard/bookings";
      } else {
        window.location.reload();
      }
    });
  };
  const mutation = useMutation(deleteBooking, { onSuccess });

  const handleBookingDelete = (id: string) => {
    mutation.mutate(id);
  };

  return { handleBookingDelete, mutation };
};
