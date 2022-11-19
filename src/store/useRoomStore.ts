import { Room } from "src/types";

import create from "zustand";
import { devtools, persist } from "zustand/middleware";
type RoomState = {
  rooms: Room[];
  setRooms: (rooms: Room[]) => void;
  deleteRoom: (id: string) => void;
  addRoom: (room: Room[]) => void;
  updateRoom: (data: Room, id: string) => void;
};

export const useRoomStore = create<RoomState>()(
  devtools(
    persist(
      (set) => ({
        rooms: [],

        setRooms: (rooms) => set((state) => ({ rooms: rooms })),
        deleteRoom: (id) =>
          set((state) => ({
            rooms: state.rooms.filter((room) => room._id !== id),
          })),

        addRoom: (room) =>
          set((state) => ({ rooms: [...state.rooms, ...room] })),

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
