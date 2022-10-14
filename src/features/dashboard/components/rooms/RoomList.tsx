import React, { useState } from "react";
import { useListRooms, useDeleteRoom } from "../../api/";
import { Button, LinkTo, DashboardCard } from "src/components";
import { Room } from "src/types";
export const RoomList = () => {
  const { data } = useListRooms();
  const { handleRoomDelete } = useDeleteRoom();

  const [rooms, setRooms] = useState<Room[]>(
    data
      ? data.sort((a, b) => a.roomNumber - b.roomNumber)
      : JSON.parse(sessionStorage.getItem("rooms")!)
  );

  const roomSort = (a: "roomNumber" | "roomPrice" | "roomType") => {
    if (rooms) {
      switch (a) {
        case "roomNumber":
          const roomNumberSort = rooms.sort(
            (a, b) => b.roomNumber - a.roomNumber
          );
          setRooms([...roomNumberSort]);
          break;
        case "roomPrice":
          const priceSort = rooms.sort(
            (a, b) => b.roomPrice - a.roomPrice
          );
          setRooms([...priceSort]);
          break;
        case "roomType":
          const roomTypeSort = rooms.sort((a, b) =>
            a.roomType.localeCompare(b.roomType)
          );
          setRooms([...roomTypeSort]);
      }
    }
  };

  return (
    <div className="mx-auto my-0 font-general_sans">
      <>
        {rooms && (
          <>
            <div className="bg-secondary py-16 w-full">
              <div className="w-9/12 mx-auto">
                <h1 className="md:text-4xl text-2xl font-medium mb-10 text-white">
                  Rooms
                </h1>
                <div className=" flex justify-between flex-wrap">
                  <DashboardCard details={rooms.length} name="Total Rooms:" />
                  <DashboardCard
                    details={
                      rooms.filter((room: Room) => room.roomStatus === "active")
                        .length
                    }
                    name="Booked Rooms:"
                  />
                  <DashboardCard
                    details={
                      rooms.filter((room) => room.roomStatus !== "active")
                        .length
                    }
                    name="Available Rooms:"
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
                <thead className="">
                  <tr>
                    <td>
                      <div className="flex items-center">
                        <LinkTo
                          to="/dashboard/rooms/create"
                          className="p-2 border-2 border-secondary bg-secondary
                          shadow-sm shadow-black text-white"
                        >
                          Add A Room
                        </LinkTo>
                        <details className="relative">
                          <summary
                            className="p-2 border-secondary border-2 ml-4
                      shadow-sm shadow-black text-secondary"
                          >
                            Sort
                          </summary>
                          <div className="border border-secondary absolute z-10 ml-4 w-52">
                            <Button
                              variant="tertiary"
                              handleClick={() => roomSort("roomNumber")}
                            >
                              By Room Number
                            </Button>
                            <Button
                              variant="tertiary"
                              handleClick={() => roomSort("roomPrice")}
                            >
                              By Room Price
                            </Button>
                            <Button
                              variant="tertiary"
                              handleClick={() => roomSort("roomType")}
                            >
                              By Room Type
                            </Button>
                          </div>
                        </details>
                      </div>
                    </td>
                  </tr>
                  <tr className=" w-full text-left text-xl   font-general_sans">
                    <th>Room Number</th>
                    <th>Room Status</th>
                    <th>Room Type</th>
                    <th>Room Price</th>
                  </tr>
                </thead>
                <tbody className="  text-xl py-4 table-row-group font-medium opacity-70">
                  {rooms.map((room) => (
                    <React.Fragment key={room.roomNumber}>
                      <tr>
                        <td>{room.roomNumber}</td>
                        <td className="capitalize">{room.roomStatus}</td>
                        <td>{room.roomType}</td>
                        <td>{room.roomPrice}</td>

                        <td>
                          <LinkTo
                            to={`/dashboard/rooms/edit/${room._id}`}
                            className="bg-secondary mr-4 text-white rounded-sm p-2 "
                          >
                            Edit
                          </LinkTo>
                          <Button
                            variant="listsecondary"
                            handleClick={() => handleRoomDelete(room._id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    </React.Fragment>
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
