import { FallbackImage } from "src/components";

export const BottomSection = () => {
  return (
    <section className="w-full">
      <div className="lg:m-8 m-2 ">
        <div
          className="flex flex-wrap w-11/12 justify-between
        text-center mx-auto mt-28"
        >
          <div className="lg:w-5/12 w-full">
            <FallbackImage
              src="/images/topbig.jpg"
              alt=""
              fallback="/images/topbig.webp"
              className="h-4/6 object-cover w-full"
            />
          </div>
          <div className="lg:w-6/12 flex-col justify-around">
            <div className="">
              <h1
                className="font-boska text-3xl xl:text-6xl lg:text-5xl
              md:text-4xl font-medium my-4 text-center"
              >
                The line of sight is right. At our laid back hotel in{" "}
                <span className="underline decoration-secondary">Okinawa.</span>
              </h1>
              <h2 className="font-general_sans opacity-70 xl:text-2xl  text-md my-8 ">
                Shifuku{" "}
                <span className="underline decoration-secondary">(至福)</span>{" "}
                is the Japanese word for "bliss". The hotel’s signature profile
                is that of a peaceful hotel, inspired by and integrated with
                nature. Our love for nature is ceaseless, as is the need to be
                genuinely grounded. This connection nurtures the soul to its
                core.
              </h2>
            </div>
            <FallbackImage
              src="/images/topsmall.jpg"
              fallback="/images/topsmall.webp"
              alt=""
              className="self-end  object-cover lg:h-3/6 w-full
              object-bottom h-fit mt-24"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
