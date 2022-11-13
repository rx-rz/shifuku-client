import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRoomStore } from "src/store/useRoomStore";
import { Room, UserAuthProps } from "src/types";
import { errorToast, successToast } from "src/utils/toasts";

const user = JSON.parse(localStorage.getItem("user")!);
const userData: UserAuthProps = user;

export const useUpdateRooms = () => {
  const updateRoomStore = useRoomStore((state) => state.updateRoom);
  const updateRoom = async (props: {
    data: Partial<Room>;
    id: string;
  }): Promise<Room> => {
    const { id, data } = props;
    const response = await axios.patch(
      `${process.env.REACT_APP_LIVE_URL}/rooms/${id}`,
      { ...data },
      {
        headers: {
          Authorization: `${userData.user.firstName} ${userData.token}`,
        },
      }
    );
    return response.data;
  };
  const queryClient = useQueryClient();

  const onSuccess = (data: Room) => {
    queryClient.invalidateQueries(["rooms"]).then(() => {
      updateRoomStore(data, data._id);
      if (window.location.pathname !== "/booking" || "/dashboard/bookings") {
        successToast("Room sucessfully updated");
        setTimeout(() => (window.location.pathname = "/dashboard/rooms"), 1500);
      }
    });
  };

  const onError = () => {
    errorToast("An error occured. Please try again.");
  };

  const mutation = useMutation(updateRoom, { onError, onSuccess });

  const handleRoomUpdate = (props: { data: Partial<Room>; id: string }) => {
    mutation.mutate(props);
  };

  return { handleRoomUpdate, mutation };
};
