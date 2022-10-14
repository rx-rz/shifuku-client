import moment from "moment";
import React from "react";

import { Button, FallbackImage } from "src/components";
import { useAvailableRooms } from "../../api/";
import { BookingForm } from "./BookingForm";

type FormValueProps = {
  formValues: {
    checkInDate: string;
    checkOutDate: string;
    noOfGuests: number;
    dateError: boolean;
    dateErrorTwo: boolean;
  };
};

export const AvailableRooms = ({ formValues }: FormValueProps) => {
  const { rooms } = useAvailableRooms();
  const refs = rooms && rooms.map(() => React.createRef<HTMLDivElement>());

  const handleFormToggle = (index: number) => {
    refs && refs[index].current?.classList.toggle("hidden");
  };

  const noOfDays =
    formValues &&
    moment(formValues.checkOutDate).diff(
      moment(formValues.checkInDate),
      "days"
    );

  return (
    <div
      className="lg:w-9/12 w-11/12  mx-auto  mt-8 justify-center
     items-center lg:h-screen overflow-y-scroll font-general_sans"
    >
      <h1 className="text-3xl mb-8 font-medium mx-auto  z-10">
        Available Rooms
      </h1>
      {formValues.dateError && (
        <p className="bg-red-500 text-white px-1">
          check in date cannot come after your checkout date.
        </p>
      )}
      {formValues.dateErrorTwo && (
        <p className="bg-red-500 text-white px-1">
          check in date cannot come before today's date.
        </p>
      )}
      {formValues.checkInDate &&
      formValues.noOfGuests &&
      rooms &&
      refs &&
      !formValues.dateError &&
      !formValues.dateErrorTwo ? (
        <>
          {rooms.map((room, index) => (
            <React.Fragment key={room.roomNumber}>
              <article className="  py-2 w-full mx-auto my-8 flex opacity-80 justify-between">
                <div className="w-5/12 h-full">
                  <FallbackImage
                    className="object-cover"
                    src={room.roomUrl + ".jpg"}
                    fallback={room.roomUrl + ".webp"}
                    alt={room.roomType}
                  />
                </div>
                <div className="w-6/12">
                  <h1 className="lg:text-3xl text-2xl font-medium">
                    {room.roomType} Lounge
                  </h1>
                  <h2 className="text-black lg:text-xl text-lg font-medium opacity-80">
                    <span className="text-secondary"> ¥</span>
                    {noOfDays * room.roomPrice * formValues.noOfGuests}
                  </h2>
                  <Button
                    handleClick={() => handleFormToggle(index)}
                    variant="secondary"
                  >
                    Book This Room
                  </Button>
                </div>
              </article>
              <div
                ref={refs[index]}
                className="hidden my-8 w-8/12"
                key={room.roomNumber}
              >
                <BookingForm
                  bookingPrice={
                    noOfDays * room.roomPrice * formValues.noOfGuests
                  }
                  checkIn={formValues.checkInDate}
                  roomId={room._id}
                  checkOut={formValues.checkOutDate}
                  noOfGuests={formValues.noOfGuests}
                  roomNo={room.roomNumber}
                  roomType={room.roomType}
                />
              </div>
            </React.Fragment>
          ))}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
