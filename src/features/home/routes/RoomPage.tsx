import { useParams } from "react-router-dom";
import { DefaultLayout } from "src/components";
import { rooms } from "src/utils/rooms";
import { Room } from "../components";

export const RoomPage = () => {
  const { roomname } = useParams();
  const room = rooms.filter(
    (room) => room.name[0].toLowerCase() === roomname
  )[0];

  return (
    <DefaultLayout>
      <Room room={room} />
    </DefaultLayout>
  );
};
