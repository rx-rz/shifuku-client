import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Room = {
  roomNumber: number;
  _id: string;
  roomUrl: string;
  roomPrice: number;
  roomStatus: "active" | "inactive" | "pending";
  roomType: "Shizukana" | "Yorokobi" | "Hofu" | "Kofuku";
};

export const useAvailableRooms = () => {
  const fetchRooms = async (): Promise<Room[]> => {
    const { data } = await axios.get(`${process.env.REACT_APP_LIVE_URL}/rooms`);
    return data;
  };


  const { data, isError, isLoading, error, isFetching } = useQuery(
    ["rooms"],
    fetchRooms
  );
  const rooms = data && data.filter((data) => data.roomStatus === "inactive");
  return { rooms, isError, isLoading, error, isFetching };
};
