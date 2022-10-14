import { FallbackImage } from "src/components";

export const MidDescriptionWithImages = () => {
  return (
    <section className="w-full min-h-screen font-boska mt-40 flex flex-wrap text-center">
      <div className=" max-w-6xl mb-24 w-10/12 mx-auto">
        <h1 className="font-boska text-3xl xl:text-6xl lg:text-5xl md:text-4xl font-medium my-4 ">
          Look straight up to the roof. That’s where{" "}
          <span className="underline decoration-secondary">relaxation</span>{" "}
          lives, <span className="underline decoration-secondary">peace</span>{" "}
          is at home, the muse{" "}
          <span className="underline decoration-secondary">lingers.</span>
        </h1>
        <h2 className="font-general_sans opacity-70 xl:text-2xl  text-md my-8 ">
          Hunger is the best cook, or so they say. We think that nature does
          just as good a job. Which is why this is exactly where our ingredients
          come from. And wherever possible from close by. From the sumptuous
          breakfast buffet to the elegant yet leisurely dinner, we serve
          delicacies from which only the dream view will distract you.
        </h2>
      </div>
      <div className=" flex justify-evenly mb-32  items-center">
        <div className="w-4/12">
          <FallbackImage
            src="/images/bottom.jpg"
            alt=""
            className="w-full h-3/6 object-cover"
            fallback="/images/bottom.webp"
          />
        </div>
        <div className="w-7/12">
          <FallbackImage
            src="/images/midbig.jpg"
            alt=""
            className="w-full object-cover h-5/6"
            fallback="/images/midbig.webp"
          />
        </div>
      </div>
    </section>
  );
};
