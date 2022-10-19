import { Room } from "src/types";

import create from "zustand";
import { devtools, persist } from "zustand/middleware";
type RoomState = {
  rooms: Room[];
  deleteRoom: (id: string) => void;
  setRooms: (rooms: Room[]) => void;
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

        setRooms: (rooms) => set((state) => ({ rooms: rooms })),
      }),
      {
        name: "room-storage",
        getStorage: () => sessionStorage,
      }
    )
  )
);
