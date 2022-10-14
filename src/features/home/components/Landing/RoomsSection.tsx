import { FallbackImage, LinkTo } from "src/components";
import { rooms } from "src/utils/rooms";

export const RoomsSection = () => {
  return (
    <section className="w-10/12 mx-auto" id="rooms">
      <h1
        className="font-boska text-4xl xl:text-6xl lg:text-5xl
       font-medium md:mt-10  md:mb-36 text-center"
      >
        Rooms (部屋)
      </h1>
      {rooms.map((room) => (
        <div className=" mx-auto my-20" key={room.name[1]}>
          <h2 className="font-boska xl:text-5xl mb-4 text-3xl md:text-4xl font-medium">
            {room.name[0]}{" "}
            <span className="underline decoration-secondary">
              ({room.name[1]})
            </span>{" "}
            Lodge
          </h2>
          <div>
            <FallbackImage
              src={room.homePageUrl + "jpg"}
              className="max-h-[55vh] object-bottom object-cover w-full"
              alt={room.name[0]}
              fallback={room.homePageUrl + "webp"}
            />

            <div className="flex flex-wrap justify-between items-center">
              <p className="md:w-9/12 text-md md:text-xl lg:text-2xl  opacity-80 my-4 font-general_sans w-full ">
                {room.details}
              </p>
              <LinkTo
                to={`/rooms/${room.name[0].toLowerCase()}`}
                variant="room"
              >
                View Details
              </LinkTo>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
