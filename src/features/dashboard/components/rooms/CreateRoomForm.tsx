import { Button, Form, InputField, SelectField } from "src/components";
import { useCreateRoom } from "../../api";

export const CreateRoomForm = () => {
  const { handleSubmit, mutation } = useCreateRoom();

  type RoomFormProps = {
    roomType: string;
    noOfRooms: string;
    roomUrl: string;
    roomPrice: number;
  };

  const roomNames = ["Yorokobi", "Hofu", "Shizukana", "Kofuku"];

  return (
    <div className="max-w-xl w-10/12  mx-auto">
      <h1 className="text-3xl mt-8 font-medium">Create Room</h1>

      <Form
        onSubmit={(data: RoomFormProps) => handleSubmit(data)}
        options={{ mode: "onBlur" }}
      >
        {({ register, formState }) => (
          <>
            <SelectField
              label="Room Name"
              registration={register("roomType")}
              values={roomNames}
            />
            <InputField
              variant="primary"
              label="Room Price"
              registration={register("roomPrice", {
                required: "Please enter a room price",
                min: {
                  value: 200,
                  message: "Room price cannot be less than 200 yen",
                },
              })}
              error={formState.errors["roomPrice"]}
              type="number"
            />
            <InputField
              variant="primary"
              label="Number Of Rooms"
              registration={register("noOfRooms", {
                required: "Please enter the amount of rooms to be created",
              })}
              error={formState.errors["noOfRooms"]}
              type="number"
            />
            <div className="mt-4"></div>
            <Button
              loading={mutation.isLoading}
              type="submit"
              variant="primary"
            >
              {!mutation.isLoading || mutation.isError
                ? "Create Room(s)"
                : "Loading..."}
            </Button>
          </>
        )}
      </Form>
    </div>
  );
};
