import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRoomStore } from "src/store/useRoomStore";
import { Room } from "src/types";
import { errorToast, successToast } from "src/utils/toasts";
import { useListRooms } from "./useListRoom";

type RoomFormProps = {
  roomType: string;
  noOfRooms: string;
  roomUrl: string;
  roomPrice: number;
  roomNumber?: number;
  roomStatus: "active" | "inactive" | "pending";
};

export const useCreateRoom = () => {
  // get rooms from "useListRooms" hook
  const { data: rooms } = useListRooms();
  // get addRoom method from "useRoomStore" hook
  const addRoomStore = useRoomStore((state) => state.addRoom);
  // get queryClient from "useQueryClient" hook
  const queryClient = useQueryClient();
  // calculate noOfRooms by adding the length of rooms + 1
  const noOfRooms = rooms && rooms?.length + 1;

  // make a POST request to "/rooms" endpoint with the data
  const postRooms = async (data: Omit<RoomFormProps, "noOfRooms">) => {
    const response = await axios.post(
      `${process.env.REACT_APP_LIVE_URL}/rooms`,
      { ...data }
    );
    return response.data;
  };

  // callback to be called after a successful mutation
  const onSuccess = async (data: Room[]) => {
    // add rooms to the store
    addRoomStore(data);
    // show success toast message
    successToast("Room created successfully.");
    // invalidate "rooms" query and redirect after 1.5 seconds
    await queryClient.invalidateQueries(["rooms"]).then(() => {
      setTimeout(() => (window.location.pathname = "/dashboard/rooms"), 1500);
    });
  };

  // callback to be called after an error occurs
  const onError = () => {
    // show error toast message
    errorToast("An error occured. Please try again.");
  };

  // use mutation hook to make a POST request
  const mutation = useMutation(postRooms);

  // handle form submit
  const handleSubmit = (data: RoomFormProps) => {
    // loop through the number of rooms specified
    for (
      let i = noOfRooms && noOfRooms;
      i! < noOfRooms! + Number.parseInt(data.noOfRooms);
      i!++
    ) {
      // set the room URL based on room type
      switch (data.roomType) {
        case "Shizukana":
          data.roomUrl = "/images/shizu1";
          break;
        case "Hofu":
          data.roomUrl = "/images/hoyu1";
          break;
        case "Kofuku":
          data.roomUrl = "/images/kofu1";
          break;
        case "Yorokobi":
          data.roomUrl = "/images/yoro1";
          break;
      }

      // mutate with the room data and call onSuccess and onError callbacks
      mutation.mutate(
        {
          ...data,
          roomNumber: i!,
          roomUrl: data.roomUrl,
          roomStatus: "inactive",
        },
        { onSuccess, onError }
      );
    }
  };

  // return the handleSubmit method and mutation object
  return { mutation, handleSubmit };
};
