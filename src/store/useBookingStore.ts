import { Booking } from "src/types";
import create from "zustand";

interface BookingState {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  deleteBooking: (id: string) => void;
  setBookings: (bookings: Booking[]) => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  bookings: [],

  addBooking: (booking) =>
    set((state) => ({ bookings: [...state.bookings, booking] })),
  deleteBooking: (id) =>
    set((state) => ({
      bookings: state.bookings.filter((booking) => booking._id !== id),
    })),
  setBookings: (bookings) => set((state) => ({ bookings: bookings })),
}));
