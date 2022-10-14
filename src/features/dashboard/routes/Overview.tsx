import { DashboardLayout } from "src/components";
import { BookingTable, TopCards, RoomTable } from "../components"

export const Overview = () => {
  return (
    <DashboardLayout>
      <TopCards />
      <div
        className="lg:w-9/12 w-11/12 mx-auto my-8 flex
       flex-wrap justify-between font-general_sans"
      >
        <div className="lg:w-7/12 w-full ">
          <BookingTable />
        </div>
        <div className="lg:w-4/12 w-full">
          <RoomTable />
        </div>
      </div>
      {/* <BottomTables /> */}
    </DashboardLayout>
  );
};
