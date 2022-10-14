import { useParams } from "react-router-dom";
import { Button, DashboardCard } from "src/components";
import {
  useAcceptBooking,
  useBookingDetails,
  useDeleteBooking,
  useUpdateRooms,
} from "../../api/";

const setDate = (timestamp: string) => {
  const date = new Date(timestamp).toString().split(" ").slice(0, 4).join(" ");
  return date;
};

export const BookingDetails = () => {
  const { id } = useParams();
  const { booking, isLoading } = useBookingDetails(id!);
  const { handleSubmit: handleBookingApproval } = useAcceptBooking();
  const { handleBookingDelete } = useDeleteBooking();
  const { handleRoomUpdate } = useUpdateRooms();

  const handleApproval = (id: string, roomId: string) => {
    handleBookingApproval({ id, roomId });
    handleRoomUpdate({ data: { roomStatus: "active" }, id: roomId });
  };

  return (
    <div className="min-h-screen py-16 bg-secondary">
      <div className=" w-10/12 mx-auto font-general_sans ">
        <div className="flex justify-between ">
          <h1 className="lg:text-5xl text-4xl  font-medium text-white  mb-16">
            Booking Details
          </h1>
          {booking && (
            <>
              {booking.bookingStatus === "pending" && (
                <Button
                  handleClick={() =>
                    handleApproval(booking._id, booking.roomId)
                  }
                  variant="listprimary"
                  className="h-14 text-xl font-medium"
                >
                  Approve
                </Button>
              )}

              <Button
                handleClick={() => handleBookingDelete(id!)}
                variant="listsecondary"
                className="h-14 text-xl font-medium"
              >
                Delete
              </Button>
            </>
          )}
        </div>
        {booking && !isLoading && (
          <>
            <div className="flex justify-between flex-wrap">
              <DashboardCard
                details={booking.customerName}
                name="Customer Name"
              />
              <DashboardCard details={booking.bookingPrice} name="Price" />
              <DashboardCard
                details={booking.noOfGuests}
                name="Number Of Guests"
              />
            </div>
            <div className="flex justify-between flex-wrap">
              <DashboardCard
                details={setDate(booking.checkIn)}
                name="Check In Date"
              />
              <DashboardCard
                details={setDate(booking.checkOut)}
                name="Check Out Date"
              />
              <DashboardCard details={booking.roomNo} name="Room Number" />
            </div>
            <div className="flex justify-between flex-wrap">
              <DashboardCard details={booking.roomType} name="Room Type" />
              <DashboardCard
                details={booking.customerPhoneNo}
                name="Customer Phone Number"
              />
              <DashboardCard
                details={booking.bookingStatus}
                name="Booking Status"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
