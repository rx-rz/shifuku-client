import { Booking } from "src/types";

export const bookingTypeProps = [
  { name: "Room Number", tag: "roomNo" },
  { name: "Check In", tag: "checkIn" },
  { name: "Check Out", tag: "checkOut" },
  { name: "Customer Name", tag: "customerName" },
  { name: "Booking Price", tag: "bookingPrice" },
  { name: "Room Type", tag: "roomType" },
];

export const bookingSort = (
  bookings: Booking[],
  setBookings: React.Dispatch<React.SetStateAction<Booking[] | undefined>>,
  a: string
) => {
  if (bookings) {
    switch (a) {
      case "roomNo":
        const roomNoSort = bookings.sort((a, b) => b.roomNo - a.roomNo);
        setBookings([...roomNoSort]);
        break;
      case "checkIn":
        const checkInSort = bookings.sort((a, b) =>
          b.checkIn.localeCompare(a.checkIn)
        );
        setBookings([...checkInSort]);
        break;
      case "roomType":
        const roomTypeSort = bookings.sort((a, b) =>
          a.roomType.localeCompare(b.roomType)
        );
        setBookings([...roomTypeSort]);
        break;
      case "customerName":
        const customerNameSort = bookings.sort((a, b) =>
          a.customerName.localeCompare(b.customerName)
        );
        setBookings([...customerNameSort]);
        break;
      case "customerPhoneNo":
        const customerPhoneNoSort = bookings.sort((a, b) =>
          a.customerPhoneNo.localeCompare(b.customerPhoneNo)
        );
        setBookings([...customerPhoneNoSort]);
        break;
      case "bookingPrice":
        const bookingPriceSort = bookings.sort(
          (a, b) => b.bookingPrice - a.bookingPrice
        );
        setBookings([...bookingPriceSort]);
        break;
      case "pendingBookings":
        const pendingBookingsSort = [...bookings].filter(
          (booking) => booking.bookingStatus === "pending"
        );

        setBookings(pendingBookingsSort);
        break;
      case "approvedBookingst":
        const approvedBookingsSort = [...bookings].filter(
          (booking) => booking.bookingStatus === "approved"
        );

        setBookings(approvedBookingsSort);
        break;
    }
  }
};
