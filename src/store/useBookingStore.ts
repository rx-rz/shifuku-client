import { Booking } from "src/types";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface BookingState {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  deleteBooking: (id: string) => void;
  acceptBooking: (id: string) => void;
  setBookings: (bookings: Booking[]) => void;
}

export const useBookingStore = create<BookingState>()(
  devtools(
    persist(
      (set) => ({
        bookings: [],

        addBooking: (booking) =>
          set((state) => ({ bookings: [...state.bookings, booking] })),

        deleteBooking: (id) =>
          set((state) => ({
            bookings: state.bookings.filter((booking) => booking._id !== id),
          })),

        acceptBooking: (id) =>
          set((state) => ({
            bookings: state.bookings.map((booking) =>
              booking._id === id
                ? { ...booking, bookingStatus: "approved" }
                : booking
            ),
          })),

        setBookings: (bookings) => set((state) => ({ bookings: bookings })),
      }),
      {
        name: "booking-storage",
        getStorage: () => sessionStorage,
      }
    )
  )
);
