import React, { useState } from "react";
import { LinkTo, DashboardCard, Button } from "src/components";
import { Booking } from "src/types";

import { useUpdateRooms, useAcceptBooking, useListBooking } from "../../api/";
import { bookingTypeProps, bookingSort } from "../../utils";

export const BookingList = () => {
  const { bookings: data } = useListBooking();
  const { handleSubmit: handleBookingApproval } = useAcceptBooking();
  const { handleRoomUpdate } = useUpdateRooms();
  const [bookings, setBookings] = useState<Booking[] | undefined>(
    data ?? JSON.parse(sessionStorage.getItem("bookings")!)
  );

  const handleApproval = (id: string, roomId: string) => {
    handleBookingApproval({ id, roomId });
    handleRoomUpdate({ data: { roomStatus: "active" }, id: roomId });
  };

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
      <>
        {bookings && (
          <>
            <div className="bg-secondary py-16">
              <div className="w-9/12 mx-auto">
                <h1 className="md:text-4xl text-2xl font-medium mb-10 text-white">
                  Bookings
                </h1>
                <div className=" flex justify-between flex-wrap">
                  <DashboardCard
                    details={bookings.length}
                    name="Total Bookings:"
                  />
                  <DashboardCard
                    details={(bookings.length / 12).toFixed(2)}
                    name="Net Bookings:"
                  />
                  <DashboardCard
                    details={
                      bookings.filter(
                        (booking) => booking.bookingStatus === "pending"
                      ).length
                    }
                    name="Pending Bookings:"
                  />
                </div>
              </div>
            </div>

            <div className="overflow-y-scroll mx-auto pb-32">
              <table
                className=" border-separate md:border-spacing-8
              border-spacing-4 mx-auto font-general_sans min-w-[1700px]
              overflow-x-scroll"
              >
                <thead>
                  <tr>
                    <td>
                      <div className="flex items-baseline">
                        <Button
                          variant="primary"
                          handleClick={() =>
                            bookingSort(
                              bookings,
                              setBookings,
                              "pendingBookings"
                            )
                          }
                        >
                          Pending Bookings
                        </Button>
                        <Button
                          variant="primary"
                          className="ml-4"
                          handleClick={() =>
                            bookingSort(
                              bookings,
                              setBookings,
                              "approvedBookings"
                            )
                          }
                        >
                          Approved Bookings
                        </Button>
                        <details className="relative bg-white">
                          <summary className="p-2 border-secondary border-2 ml-4 shadow-sm shadow-black text-secondary">
                            Sort
                          </summary>
                          <div className="border border-secondary absolute z-50 ml-4 w-52 bg-white">
                            {bookingTypeProps.map((typeProp) => (
                              <React.Fragment key={typeProp.name}>
                                <Button
                                  key={typeProp.name}
                                  variant="tertiary"
                                  className="p-2"
                                  handleClick={() =>
                                    bookingSort(
                                      bookings,
                                      setBookings,
                                      typeProp.tag
                                    )
                                  }
                                >
                                  {typeProp.name}
                                </Button>
                              </React.Fragment>
                            ))}
                          </div>
                        </details>
                      </div>
                    </td>
                  </tr>
                  <tr className=" w-full text-left text-md lg:text-xl  opacity-80 text-secondary font-medium">
                    <th>N/O</th>
                    <th>Customer Name</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                    <th>Room Type</th>
                    <th>Room Number</th>
                    <th>Status</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody className="text-md  lg:text-xl py-4 table-row-group font-medium opacity-70">
                  {bookings.map((booking, index) => (
                    <tr key={booking._id}>
                      <td>{index + 1}</td>
                      <td>{booking.customerName}</td>
                      <td>{setDate(booking.checkIn)}</td>
                      <td>{setDate(booking.checkOut)}</td>
                      <td>{booking.roomType}</td>
                      <td className=" capitalize">{booking.roomNo}</td>
                      <td className="capitalize">{booking.bookingStatus}</td>
                      <td>{booking.bookingPrice.toLocaleString()}</td>
                      <td>
                        <LinkTo
                          to={booking._id}
                          className="bg-secondary rounded-sm p-2 text-white"
                        >
                          Details
                        </LinkTo>
                      </td>
                      {booking.bookingStatus === "pending" && (
                        <td>
                          <Button
                            variant="listprimary"
                            handleClick={() =>
                              handleApproval(booking._id, booking.roomId)
                            }
                          >
                            Approve
                          </Button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </>
    </div>
  );
};
