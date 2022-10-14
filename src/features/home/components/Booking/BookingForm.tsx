import { Button, Form, InputField } from "src/components";
import { useCreateBooking } from "../../api";

type BookingFormProps = {
  checkIn: string;
  checkOut: string;
  bookingPrice: number;
  customerName: string;
  customerPhoneNo: string;
  bookingStatus: "pending" | "approved";
  noOfGuests: number;
  roomType: string;
  roomId: string;
  roomNo: number;
};

export const BookingForm = ({
  checkIn,
  checkOut,
  bookingPrice,
  noOfGuests,
  roomNo,
  roomId,
  roomType,
}: Omit<
  BookingFormProps,
  "customerName" | "customerPhoneNo" | "bookingStatus"
>) => {

  const { handleSubmit } = useCreateBooking();
  
  return (
    <Form
      onSubmit={(data: BookingFormProps) =>
        handleSubmit({
          ...data,
          checkIn,
          checkOut,
          bookingStatus: "pending",
          bookingPrice,
          noOfGuests,
          roomNo,
          roomId,
          roomType,
        })
      }
      options={{ mode: "onBlur" }}
      className=""
    >
      {({ register, formState }) => (
        <div className=" h-fit">
          <InputField
            variant="secondary"
            type="text"
            label="Full Name"
            error={formState.errors["customerName"]}
            registration={register("customerName", {
              required: "Please enter your full name.",
            })}
          />
          <InputField
            variant="secondary"
            type="number"
            label="Phone Number"
            error={formState.errors["customerPhoneNo"]}
            registration={register("customerPhoneNo", {
              required: "Please input a phone number.",
            })}
          />
          <Button variant="primary">Submit</Button>
        </div>
      )}
    </Form>
  );
};
