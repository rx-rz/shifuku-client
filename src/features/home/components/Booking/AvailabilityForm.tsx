import { useState } from "react";
import { Button, Form, InputField } from "src/components";

type AvailabilityFormProps = {
  setFormValues: React.Dispatch<
    React.SetStateAction<{
      checkInDate: string;
      checkOutDate: string;
      noOfGuests: number;
      dateError: boolean;
      dateErrorTwo: boolean;
    }>
  >;
};
export const AvailabilityForm = ({ setFormValues }: AvailabilityFormProps) => {
  const [noOfGuests, setNoOfGuests] = useState(1);
  const presentDate = Date.now();
  if (noOfGuests <= 0) {
    setNoOfGuests(1);
  }

  type BookFormProps = {
    checkInDate: string;
    checkOutDate: string;
    noOfGuests: number;
  };

  const handleSubmit = (data: BookFormProps) => {
    const dateError =
      Date.parse(data.checkInDate) > Date.parse(data.checkOutDate);
    const dateErrorTwo = Date.parse(data.checkInDate) < presentDate;
    setFormValues({ ...data, noOfGuests, dateError, dateErrorTwo });
  };

  return (
    <Form
      onSubmit={(data: BookFormProps) => handleSubmit(data)}
      options={{ mode: "onBlur" }}
      className="accent-secondary"
    >
      {({ register, formState }) => (
        <>
          <div className="lg:w-9/12 w-11/12  mx-auto  mt-8 justify-center items-center font-general_sans">
            <h1 className="text-3xl font-medium">Parameters</h1>
            <div className="my-8">
              <InputField
                variant="primary"
                type="datetime-local"
                label="Check In Date"
                error={formState.errors["checkInDate"]}
                registration={register("checkInDate", {
                  required: "Please choose a check in date.",
                })}
              />
              <div className="mb-8"></div>
              <InputField
                variant="primary"
                type="datetime-local"
                label="Check Out Date"
                error={formState.errors["checkOutDate"]}
                registration={register("checkOutDate", {
                  required: "Please choose a check out date.",
                })}
              />
              <div className="flex-col mt-8 -mb-6">
                <label className="text-xl  opacity-80 font-medium mt-2">
                  Number Of Guests
                </label>
                <div className="flex my-2 text-2xl opacity-80">
                  <button
                    onClick={() =>
                      setNoOfGuests((noOfGuests) => noOfGuests - 1)
                    }
                    className="mr-4"
                  >
                    -
                  </button>
                  <h2 className="font-medium">{noOfGuests}</h2>
                  <button
                    onClick={() =>
                      setNoOfGuests((noOfGuests) => noOfGuests + 1)
                    }
                    className="ml-4"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="mt-8"></div>
              <Button variant="primary">Check Availability</Button>
            </div>
          </div>
        </>
      )}
    </Form>
  );
};
