import { DashboardCard } from "src/components";
import { useBookingStore } from "src/store/useBookingStore";
import { useRoomStore } from "src/store/useRoomStore";

export const TopCards = () => {
  const { user } = JSON.parse(localStorage.getItem("user")!);
  const bookings = useBookingStore((state) => state.bookings);
  const rooms = useRoomStore((state) => state.rooms);
  let income = 0;
  let availableRooms: string[] = [];
  if (bookings) {
    for (let i = 0; i < bookings.length; i++) {
      income += bookings[i].bookingPrice;
    }
  }
  if (rooms) {
    for (let i = 0; i < rooms.length; i++) {
      if (rooms[i].roomStatus === "inactive") {
        availableRooms.push(rooms[i].roomStatus);
      }
    }
  }

  return (
    <div className="bg-secondary py-16">
      <div className="w-9/12 mx-auto">
        <h1 className="md:text-4xl text-2xl font-medium mb-14 text-white">
          Hello, {user && user.firstName} {user && user.lastName}.
        </h1>
        <div className=" flex justify-between flex-wrap">
          <DashboardCard
            details={`Y ${income.toLocaleString()}`}
            name="Income:"
          />
          <DashboardCard
            details={`Y ${Math.floor(income / 12).toLocaleString()}`}
            name="Net Income:"
          />
          <DashboardCard
            details={availableRooms.length}
            name="Available Rooms:"
          />
        </div>
      </div>
    </div>
  );
};
