import { LinkTo } from "src/components";
import { useListBooking } from "../../api";

export const BookingTable = () => {
  const { bookings } = useListBooking();

  const latestBookings =
    bookings &&
    bookings
      .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
      .slice(0, 8)
      .filter((booking) => (booking.bookingStatus = "pending"));

  const setDate = (timestamp: string) => {
    const date = new Date(timestamp)
      .toString()
      .split(" ")
      .slice(0, 4)
      .join(" ");
    return date;
  };

  return (
    <div>
      <div className="flex justify-between items-center mt-4">
        <p className="text-2xl font-bold opacity-90">Pending Bookings</p>
        <LinkTo
          to="/dashboard/bookings"
          className="p-2  bg-secondary shadow-sm shadow-black text-white"
        >
          View Bookings
        </LinkTo>
      </div>
      <table
        className="border-separate border-spacing-y-8 w-full
       my-6 opacity-90"
      >
        <thead className="text-left">
          <tr className="text-xl">
            <th>Customer Name</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Booking Price</th>
          </tr>
        </thead>
        <tbody>
          {latestBookings &&
            latestBookings.map((booking) => (
              <tr className="text-lg" key={booking._id}>
                <td>{booking.customerName}</td>
                <td>{setDate(booking.checkIn)}</td>
                <td>{setDate(booking.checkOut)}</td>
                <td className="font-medium">Y {booking.bookingPrice}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
