import { DefaultLayout } from "src/components/Layout/Layout";
import {
  HeaderSection,
  MidDescriptionWithImages,
  MiddleDescription,
  RoomsSection,
  BottomSection,
} from "../components";

export const HomePage = () => {
  return (
    <DefaultLayout>
      <HeaderSection />
      <MidDescriptionWithImages />
      <RoomsSection />
      <MiddleDescription />
      <BottomSection />
    </DefaultLayout>
  );
};
