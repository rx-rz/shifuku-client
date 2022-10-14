export type UserAuthProps = {
  token: string;
  user: {
    createdAt: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    phoneNo: string;
    role: "customer" | "admin";
    _id: string;
  };
};
export type Booking = {
  _id: string;
  checkIn: string;
  checkOut: string;
  customerName: string;
  customerPhoneNo: string;
  noOfGuests: number;
  bookingPrice: number;
  roomId: string;
  roomType: string;
  roomNo: number;
  bookingStatus: "pending" | "approved";
  createdAt: string;
};

export type Room = {
  _id: string;
  roomNumber: number;
  roomStatus: "active" | "not in use";
  roomPrice: number;
  roomType: "Shizukana" | "Yorokobi" | "Hofu" | "Kofuku";
};
