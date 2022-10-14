import { FallbackImage } from "src/components";
import { LinkTo } from "src/components/Elements/LinkTo";
import { rooms } from "src/utils/rooms";

type RoomProps = {
  room: {
    name: string[];
    price: number;
    details: string;
    properties: string[];
    homePageUrl: string;
    extraImages: string[];
  };
};
export const Room = ({ room }: RoomProps) => {
  const otherRooms = rooms.filter((otherRoom) => otherRoom.name !== room.name);
  window.scrollTo(0, 0);
  return (
    <>
      <div className="text-center md:my-48 my-24">
        <h1
          className="xl:text-9xl lg:text-7xl md:text-6xl text-5xl
         font-boska font-medium"
        >
          {room.name[0]} (<span className="text-secondary">{room.name[1]}</span>
          ) Lodge
        </h1>

        <FallbackImage
          src={room.homePageUrl + "jpg"}
          alt={room.name[0]}
          fallback={room.homePageUrl + "webp"}
          className="w-10/12 mx-auto mt-20 mb-12"
        />
      </div>
      <section className="w-full">
        <div className="lg:m-8 m-2 ">
          <div
            className="flex flex-wrap w-11/12 justify-between text-center
           mx-auto mt-28"
          >
            <div className="lg:w-5/12 w-full">
              <FallbackImage
                src={room.extraImages[1] + "jpg"}
                fallback={room.extraImages[1] + "webp"}
                alt=""
                className="h-5/6 object-cover w-full"
              />
            </div>
            <div className="lg:w-6/12 flex-col justify-around">
              <div className="">
                <h1
                  className="font-boska text-3xl xl:text-6xl lg:text-5xl md:text-4xl
                 font-medium my-4 text-center"
                >
                  Everything is just right. Enjoy our {room.name[0]} lodge in{" "}
                  <span className="underline decoration-secondary">
                    Okinawa.
                  </span>
                </h1>
                <h2 className="font-general_sans opacity-70 xl:text-2xl  text-md my-8 ">
                  {room.details}
                </h2>
              </div>
              <FallbackImage
                fallback={room.extraImages[0] + "webp"}
                src={room.extraImages[0] + "jpg"}
                alt=""
                className="self-end  object-cover lg:h-3/6 w-full object-bottom h-fit mt-24"
              />
            </div>
          </div>
        </div>
        <div
          className="font-general_sans opacity-90 xl:text-3xl  text-md
         my-8 flex justify-center items-center flex-col"
        >
          <h1
            className="font-boska text-2xl xl:text-5xl lg:text-4xl md:text-3xl
           font-medium my-4  underline decoration-secondary"
          >
            The room contains:
          </h1>
          <ol className=" my-8">
            {room.properties.map((property) => (
              <li className="list-disc md:my-4 my-2" key={property}>
                {property}
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="w-10/12 mx-auto" id="rooms">
        <h1 className="font-boska text-4xl xl:text-6xl lg:text-5xl font-medium my-20">
          Other Available Rooms
        </h1>
        {otherRooms.map((room) => (
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
                alt={room.name[1]}
                fallback={room.homePageUrl + "webp"}
                className="max-h-[55vh] object-bottom object-cover w-full"
              />
              <div className="flex flex-wrap justify-between items-center">
                <p
                  className="md:w-9/12 text-md md:text-xl lg:text-2xl
                  opacity-80 my-4 font-general_sans w-full "
                >
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
    </>
  );
};
