export const Footer = () => {
  return (
    <div className="w-full bg-secondary mx-auto pb-48 pt-48 flex ">
      <div className="flex flex-wrap items-center justify-center my-auto mx-auto w-10/12">
        <div>
          <a href="/" className="text-9xl mb-8 md:mb-0">
            至福
          </a>
          <div className="flex w-full justify-around mt-4 text-xl font-boska">
            <a
              href="https://twitter.com/_abdurrazaq_"
              className="hover:text-blue-700"
            >
              TW
            </a>
            <a
              href="https://github.com/temiloluwa-js"
              className="transition-colors duration-300 hover:text-black"
            >
              GH
            </a>
            <a
              href="https://reddit.com"
              className="transition-colors duration-300 hover:text-orange-600"
            >
              RE
            </a>
          </div>
        </div>
        <div className="flex flex-col md:ml-16 font-boska font-medium ">
          <a
            href="/"
            className="text-3xl my-4 hover:text-white transition-colors duration-300 "
          >
            Shizukana ↗
          </a>
          <a
            href="/"
            className="text-3xl my-4 hover:text-white transition-colors duration-300"
          >
            Yorokobi ↗
          </a>
          <a
            href="/"
            className="text-3xl my-4 hover:text-white transition-colors duration-300"
          >
            Kofuku ↗
          </a>
          <a
            href="/"
            className="text-3xl my-4 hover:text-white transition-colors duration-300"
          >
            Hofu ↗
          </a>
          <a
            href="/"
            className="text-3xl my-4 hover:text-white transition-colors duration-300"
          >
            Enquiries ↗
          </a>
        </div>
      </div>
    </div>
  );
};
