import { useParams } from "react-router-dom";
import { Button, Form, InputField, SelectField } from "src/components";
import { Room } from "src/types";
import { useUpdateRooms } from "../../api/rooms/useUpdateRoom";

export const UpdateRoomForm = () => {
  const { handleRoomUpdate, mutation } = useUpdateRooms();
  const { roomId } = useParams();

  const roomNames = ["Yorokobi", "Hofu", "Shizukana", "Kofuku"];
  

  return (
    <div className="max-w-xl w-10/12  mx-auto">
      <h1 className="text-3xl mt-8 font-medium">Update Room</h1>

      <Form
        onSubmit={(data: Room) => handleRoomUpdate({ data: data, id: roomId! })}
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

            <div className="mt-4"></div>
            <Button
              loading={mutation.isLoading}
              type="submit"
              variant="primary"
            >
              {!mutation.isLoading || mutation.isError
                ? "Update Room"
                : "Loading..."}
            </Button>
          </>
        )}
      </Form>
    </div>
  );
};
