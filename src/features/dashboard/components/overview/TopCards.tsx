import { DashboardCard } from "src/components";
import { useBookingStore, useRoomStore } from "src/store";

export const TopCards = () => {
// retrieve the user data from local storage
const { user } = JSON.parse(localStorage.getItem("user")!);

// retrieve bookings data from the store
const bookings = useBookingStore((state) => state.bookings);

// retrieve rooms data from the store
const rooms = useRoomStore((state) => state.rooms);

// initialize the total income to 0
let income = 0;

// initialize an array to keep track of available rooms
let availableRooms: string[] = [];

// calculate the total income from the bookings
if (bookings) {
  for (let i = 0; i < bookings.length; i++) {
    income += bookings[i].bookingPrice;
  }
}

// find all inactive rooms and add them to the availableRooms array
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
