import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRoomStore } from "src/store/useRoomStore";
import { Room } from "src/types";

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
    await queryClient.invalidateQueries(["rooms"]).then(() => {
      deleteRoomStore(data._id);
      window.location.pathname = "/dashboard/rooms";
    });
  };

  const mutation = useMutation(postRooms, { onSuccess });

  const handleRoomDelete = (id: string) => {
    mutation.mutate(id);
  };

  return { mutation, handleRoomDelete };
};
