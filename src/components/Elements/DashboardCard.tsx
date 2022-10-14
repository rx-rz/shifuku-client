type DashboardCardProps = {
  name: string;
  details: string | number;
};
export const DashboardCard = ({ name, details }: DashboardCardProps) => {
  return (
    <div className="bg-white xl:w-3/12 lg:w-5/12 md:5/12 w-full h-40 shadow-sm shadow-black mb-8 flex items-center justify-center flex-col font-general_sans">
      <span className="md:text-2xl text-xl  font-medium opacity-80 mb-4 text-secondary">
        {name}
      </span>
      <span className="md:text-4xl text-4xl font-medium opacity-90 capitalize">
        {details}
      </span>
    </div>
  );
};
