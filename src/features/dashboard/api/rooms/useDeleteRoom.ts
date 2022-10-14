import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteRoom = () => {
  const queryClient = useQueryClient();
  const roomData = useQuery(["rooms"]).data;
  const postRooms = async (id: string) => {
    const response = await axios.delete(`/rooms/${id}`);
    return response.data;
  };

  const onSuccess = async () => {
    await queryClient.invalidateQueries(["rooms"]).then(() => {
      if (window.location.pathname !== "/dashboard/rooms") {
        window.location.pathname = "/dashboard/rooms";
        sessionStorage.setItem("rooms", JSON.stringify(roomData));
      } else {
        sessionStorage.setItem("rooms", JSON.stringify(roomData));
        window.location.reload();
      }
    });
  };

  const mutation = useMutation(postRooms, { onSuccess });

  const handleRoomDelete = (id: string) => {
    mutation.mutate(id);
  };

  return { mutation, handleRoomDelete };
};
