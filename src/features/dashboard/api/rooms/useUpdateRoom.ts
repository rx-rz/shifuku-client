import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Room, UserAuthProps } from "src/types";

const user = JSON.parse(localStorage.getItem("user")!);
const userData: UserAuthProps = user;

export const useUpdateRooms = () => {
  const roomData = useQuery(["rooms"]).data;
  const updateRoom = async (props: {
    data: Partial<Room>;
    id: string;
  }): Promise<Room> => {
    const { id, data } = props;
    const response = await axios.patch(
      `/rooms/${id}`,
      { ...data },
      {
        headers: {
          Authorization: `${userData.user.firstName} ${userData.token}`,
        },
      }
    );
    return response.data;
  };
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries(["rooms"]).then(() => {
      sessionStorage.setItem("rooms", JSON.stringify(roomData));
      window.location.pathname = "/dashboard/rooms";
    });
  };

  const onError = () => {
    console.log("error");
  };

  const mutation = useMutation(updateRoom, { onError, onSuccess });

  const handleRoomUpdate = (props: { data: Partial<Room>; id: string }) => {
    mutation.mutate(props);
  };

  return { handleRoomUpdate, mutation };
};
