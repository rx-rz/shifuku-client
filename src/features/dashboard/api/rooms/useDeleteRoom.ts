import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRoomStore } from "src/store/useRoomStore";
import { Room } from "src/types";
import { errorToast, successToast } from "src/utils/toasts";


export const useDeleteRoom = () => {
  // useQueryClient is used to invalidate the "rooms" query when the room is deleted
  const queryClient = useQueryClient();
  // useRoomStore is a custom hook used to delete a room from the local store
  const deleteRoomStore = useRoomStore((state) => state.deleteRoom);
  // postRooms is a function that sends a DELETE request to the API to delete a room
  const postRooms = async (id: string) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_LIVE_URL}/rooms/${id}`
    );
    return response.data;
  };

  // onSuccess is a callback function that is triggered after a successful deletion of a room
  const onSuccess = async (data: Room) => {
    // deletes the room from the local store
    deleteRoomStore(data._id);
    // Invalidates the "rooms" query in the cache
    await queryClient.invalidateQueries(["rooms"]).then(() => {
      // Shows a success message on the UI
      successToast("Room deleted sucessfully");
      // Redirects to the "rooms" page after 1.5 seconds
      setTimeout(() => (window.location.pathname = "/dashboard/rooms"), 1500);
    });
  };

  // onError is a callback function that is triggered after a failed deletion of a room
  const onError = () => {
    // Shows an error message on the UI
    errorToast("An error occured. Please try again.");
  };

  // useMutation is a custom hook that is used to make a mutation request to the API
  const mutation = useMutation(postRooms, { onSuccess, onError });

  // handleRoomDelete is a function that is triggered when the user wants to delete a room
  const handleRoomDelete = (id: string) => {
    // Calls the mutate function to delete a room
    mutation.mutate(id);
  };

  // Returns the mutation and handleRoomDelete functions
  return { mutation, handleRoomDelete };
};
