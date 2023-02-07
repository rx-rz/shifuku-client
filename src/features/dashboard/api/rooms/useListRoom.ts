import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRoomStore } from "src/store/useRoomStore";
import { Room } from "src/types";
import { errorToast } from "src/utils/toasts";

export const useListRooms = () => {
  const setRooms = useRoomStore((state) => state.setRooms);
  const fetchRooms = async (): Promise<Room[]> => {
    const { data } = await axios.get(`${process.env.REACT_APP_LIVE_URL}/rooms`);
    return data;
  };

  const onSuccess = (data: Room[]) => {
    setRooms(data);
  };

  const onError = () => {
    errorToast("Unable to fetch rooms.")
  }
  const { data, isError, isLoading, error } = useQuery(["rooms"], fetchRooms, {
    onSuccess, onError
  });

  return { data, isError, isLoading, error };
};
