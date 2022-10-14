import { FallbackImage } from "src/components";

export const HeaderSection = () => {
  return (
    <div className="text-center my-48">
      <h1
        className="xl:text-9xl lg:text-7xl md:text-6xl text-5xl
      font-boska font-medium"
      >
        Bliss (<span className="text-secondary">至福</span>) Hotel
      </h1>
      <p
        className="xl:text-4xl lg:text-3xl md:text-2xl text-xl
      opacity-90 my-4 font-general_sans "
      >
        New, casual hotel in the centre of Okinawa, Japan.
      </p>
      <FallbackImage
        src="/images/topbig.jpg"
        fallback="/images/topbig.webp"
        alt=""
        className="w-10/12 mx-auto mt-20 mb-12"
      />
    </div>
  );
};
