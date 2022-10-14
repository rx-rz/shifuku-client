import { useState } from "react";
import { FallbackImage, DefaultLayout } from "src/components";
import { AvailableRooms, AvailabilityForm } from "../components/";

export const BookingPage = () => {
  window.scrollTo(0, 0);

  const [formValues, setFormValues] = useState({
    checkInDate: "",
    checkOutDate: "",
    noOfGuests: 1,
    dateError: false,
    dateErrorTwo: false,
  });

  return (
    <DefaultLayout>
      <div className="min-h-screen flex flex-wrap">
        <div className="lg:w-4/12 w-full">
          <AvailabilityForm setFormValues={setFormValues} />
        </div>
        <div className="lg:w-5/12 w-full lg:block">
          <AvailableRooms formValues={formValues} />
        </div>
        <div className="lg:w-3/12 hidden lg:block">
          <FallbackImage
            alt=""
            className="object-cover h-screen"
            fallback="/images/midbig.webp"
            src="/images/midbigs.jpg"
          />
        </div>
      </div>
    </DefaultLayout>
  );
};
