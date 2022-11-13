import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRoomStore } from "src/store/useRoomStore";
import { Room } from "src/types";
import { toast } from "react-hot-toast";

const successToast = () =>
  toast.success("Room deleted successfully.", {
    duration: 2500,
    position: "top-center",
    style: {
      border: "1px solid purple",
      backgroundColor: "white",
    },
  });
const errorToast = () =>
  toast.error("An error occured. Please try again.", {
    duration: 2500,
    position: "top-center",
    style: {
      border: "1px solid purple",
      backgroundColor: "white",
    },
  });

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
      successToast();
      setTimeout(() => (window.location.pathname = "/dashboard/rooms"), 3000);
    });
  };

  const onError = () => {
    errorToast();
  };

  const mutation = useMutation(postRooms, { onSuccess, onError });

  const handleRoomDelete = (id: string) => {
    mutation.mutate(id);
  };

  return { mutation, handleRoomDelete };
};
