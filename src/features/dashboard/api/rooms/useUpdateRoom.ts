import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRoomStore } from "src/store/useRoomStore";
import { Room, UserAuthProps } from "src/types";
import { errorToast, successToast } from "src/utils/toasts";

const user = JSON.parse(localStorage.getItem("user")!);
const userData: UserAuthProps = user;

export const useUpdateRooms = () => {
  const updateRoomStore = useRoomStore((state) => state.updateRoom);
  // function to update room data
  const updateRoom = async (props: { data: Partial<Room>; id: string }): Promise<Room> => {
    const { id, data } = props;
    // make a patch request to update room
    const response = await axios.patch(
      `${process.env.REACT_APP_LIVE_URL}/rooms/${id}`,
      { ...data },
      {
        headers: {
          Authorization: `${userData.user.firstName} ${userData.token}`,
        },
      }
    );
    // return updated data
    return response.data;
  };
  const queryClient = useQueryClient();

  // callback function on successful update
  const onSuccess = (data: Room) => {
    queryClient.invalidateQueries(["rooms"]).then(() => {
      updateRoomStore(data, data._id);
      // check the URL before showing success toast
      if (window.location.pathname !== "/booking" || "/dashboard/bookings") {
        successToast("Room sucessfully updated");
        setTimeout(() => (window.location.pathname = "/dashboard/rooms"), 1500);
      }
    });
  };

  // callback function on error
  const onError = () => {
    errorToast("An error occured. Please try again.");
  };

  // hook to make mutation
  const mutation = useMutation(updateRoom, { onError, onSuccess });

  // function to trigger mutation
  const handleRoomUpdate = (props: { data: Partial<Room>; id: string }) => {
    mutation.mutate(props);
  };

  // return mutation and mutation trigger function
  return { handleRoomUpdate, mutation };
};
