import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRoomStore } from "src/store/useRoomStore";
import { Room } from "src/types";
import { errorToast, successToast } from "src/utils/toasts";


export const useDeleteRoom = () => {
  const queryClient = useQueryClient();
  const deleteRoomStore = useRoomStore((state) => state.deleteRoom);
  const postRooms = async (id: string) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_LIVE_URL}/rooms/${id}`
    );
    return response.data;
  };

  const onSuccess = async (data: Room) => {
    deleteRoomStore(data._id);
    await queryClient.invalidateQueries(["rooms"]).then(() => {
      successToast("Room deleted sucessfully");
      setTimeout(() => (window.location.pathname = "/dashboard/rooms"), 1500);
    });
  };

  const onError = () => {
    errorToast("An error occured. Please try again.");
  };

  const mutation = useMutation(postRooms, { onSuccess, onError });

  const handleRoomDelete = (id: string) => {
    mutation.mutate(id);
  };

  return { mutation, handleRoomDelete };
};
