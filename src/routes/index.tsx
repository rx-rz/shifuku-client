import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { lazily } from "react-lazily";
import { HomePage } from "src/features";

const {
  Login,
  Signup,
  Overview,
  RoomPage,
  BookingPage,
  Bookings,
  Rooms,
  CreateRoom,
  BookingDetails,
  UpdateRoom,
} = lazily(() => import("src/features"));

const user = localStorage.getItem("user");
const defaultRoutes = [
  { path: "/", element: <HomePage /> },
  { path: "/auth/signup", element: <Signup /> },
  { path: "rooms/:roomname", element: <RoomPage /> },
  { path: "booking", element: <BookingPage /> },
];

const authRoutes = [
  { path: "auth/login", element: <Login /> },
  { path: "/dashboard", element: <Overview /> },
  { path: "/dashboard/bookings", element: <Bookings /> },
  { path: "/dashboard/rooms", element: <Rooms /> },
  { path: "/dashboard/rooms/create", element: <CreateRoom /> },
  { path: "/dashboard/bookings/:id", element: <BookingDetails /> },
  { path: "/dashboard/rooms/edit/:roomId", element: <UpdateRoom /> },
];

const routes = user ? [...defaultRoutes, ...authRoutes] : [...defaultRoutes];

export const AppRoutes = () => {
  const element = useRoutes([...routes]);
  return <Suspense fallback={<p>Loading...</p>}>{element}</Suspense>;
};
