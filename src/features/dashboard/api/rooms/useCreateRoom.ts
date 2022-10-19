import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRoomStore } from "src/store/useRoomStore";
import { Room } from "src/types";
import { useListRooms } from "./useListRoom";

type RoomFormProps = {
  roomType: string;
  noOfRooms: string;
  roomUrl: string;
  roomPrice: number;
  roomNumber?: number;
};

export const useCreateRoom = () => {
  const { data: rooms } = useListRooms();
  const addRoomStore = useRoomStore((state) => state.addRoom);
  const queryClient = useQueryClient();
  const noOfRooms = rooms && rooms?.length + 1;

  const postRooms = async (data: Omit<RoomFormProps, "noOfRooms">) => {
    const response = await axios.post(
      `${process.env.REACT_APP_LIVE_URL}/rooms`,
      { ...data }
    );
    return response.data;
  };

  const onSuccess = async (data: Room) => {
    await queryClient.invalidateQueries(["rooms"]).then(() => {
      addRoomStore(data);
    });
  };

  const onError = (err: any) => {};

  const mutation = useMutation(postRooms);

  const handleSubmit = (data: RoomFormProps) => {
    for (
      let i = noOfRooms && noOfRooms;
      i! < noOfRooms! + Number.parseInt(data.noOfRooms);
      i!++
    ) {
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

      mutation.mutate(
        { ...data, roomNumber: i!, roomUrl: data.roomUrl },
        { onSuccess, onError }
      );
    }
  };

  return { mutation, handleSubmit };
};
