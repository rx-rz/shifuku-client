import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Room = {
  roomNumber: number;
  _id: string;
  roomUrl: string;
  roomPrice: number;
  roomStatus: "active" | "not in use";
  roomType: "Shizukana" | "Yorokobi" | "Hofu" | "Kofuku";
};

export const useAvailableRooms = () => {
  const fetchRooms = async (): Promise<Room[]> => {
    const { data } = await axios.get("/rooms");
    return data;
  };

  const { data, isError, isLoading, error } = useQuery(["rooms"], fetchRooms);
  const rooms = data && data.filter((data) => data.roomStatus !== "active");

  return { rooms, isError, isLoading, error };
};
