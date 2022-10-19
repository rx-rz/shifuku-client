import { Room } from "src/types";

import create from "zustand";
import { devtools, persist } from "zustand/middleware";
type RoomState = {
  rooms: Room[];
  deleteRoom: (id: string) => void;
  addRoom: (room: Room[]) => void;
  setRooms: (rooms: Room[]) => void;
  updateRoom: (data: Room, id: string) => void;
};

export const useRoomStore = create<RoomState>()(
  devtools(
    persist(
      (set) => ({
        rooms: [],

        deleteRoom: (id) =>
          set((state) => ({
            rooms: state.rooms.filter((room) => room._id !== id),
          })),

        addRoom: (room) =>
          set((state) => ({ rooms: [...state.rooms, ...room] })),

        setRooms: (rooms) => set((state) => ({ rooms: rooms })),

        updateRoom: (data, id) =>
          set((state) => ({
            rooms: state.rooms.map((room) =>
              room._id === id
                ? {
                    ...room,
                    roomPrice: data.roomPrice,
                    roomType: data.roomType,
                  }
                : room
            ),
          })),
      }),

      {
        name: "room-storage",
        getStorage: () => sessionStorage,
      }
    )
  )
);
