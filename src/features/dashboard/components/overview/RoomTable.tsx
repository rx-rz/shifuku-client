import { LinkTo } from "src/components";
import { useRoomStore } from "src/store";

export const RoomTable = () => {
  // Access the `rooms` data from the room store
  const rooms = useRoomStore((state) => state.rooms);

  // Filter the available rooms with status "active" and sort by room number
  const availableRooms =
    rooms &&
    rooms
      .sort((a, b) => a.roomNumber - b.roomNumber)
      .slice(1, 4) // Only select first 4 rooms
      .filter((room) => (room.roomStatus = "active")); // Select only rooms with status "active"

  return (
    <div>
      <div className="flex justify-between items-center mt-4">
        <p className="text-2xl font-bold opacity-90">Available Rooms</p>
        <LinkTo
          to="/dashboard/rooms"
          className="p-2  bg-secondary shadow-sm
      shadow-black text-white"
        >
          View Rooms
        </LinkTo>
      </div>
      <table
        className="border-separate border-spacing-y-8
       w-full my-6 opacity-90"
      >
        <thead className="text-left">
          <tr className="text-xl">
            <th>Room Number</th>
            <th>Room Type</th>
            <th>Room Price</th>
          </tr>
        </thead>
        <tbody>
          {availableRooms &&
            availableRooms.map((room) => (
              <tr className="text-lg" key={room.roomNumber}>
                <td>{room.roomNumber}</td>
                <td>{room.roomType}</td>
                <td className="font-medium">Y {room.roomPrice}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
