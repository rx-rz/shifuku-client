import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Room } from "src/types";

export const useListRooms = () => {
  const fetchRooms = async (): Promise<Room[]> => {
    const { data } = await axios.get("/rooms");
    return data;
  };


  const onSuccess = (data: Room[] | undefined) => {
    sessionStorage.setItem("rooms", JSON.stringify(data));
  };

  const { data, isError, isLoading, error } = useQuery(["rooms"], fetchRooms, {
    onSuccess,
  });

  return { data, isError, isLoading, error };
};
