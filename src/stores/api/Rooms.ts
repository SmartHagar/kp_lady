/** @format */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { api } from "@/services/baseURL";
// api rooms
type Props = {
  page?: number;
  limit?: number;
  search?: string;
  room_type_id?: number | string;
};

type Store = {
  dtRooms: any;
  setRooms: ({ page, limit, search }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
  setRoomsAll: ({ search, room_type_id }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
};

const useRoomsApi = create(
  devtools<Store>((set, get) => ({
    dtRooms: [],
    setRooms: async ({ page = 1, limit = 10, search }) => {
      try {
        const response = await api({
          method: "get",
          url: `/rooms`,
          params: {
            limit,
            page,
            search,
          },
        });
        set((state) => ({ ...state, dtRooms: response.data }));
        return {
          status: "berhasil",
          data: response.data,
        };
      } catch (error: any) {
        return {
          status: "error",
          error: error.response.data,
        };
      }
    },
    setRoomsAll: async ({ search, room_type_id }) => {
      try {
        const response = await api({
          method: "get",
          url: `/rooms/all`,
          params: {
            search,
            room_type_id,
          },
        });
        set((state) => ({ ...state, dtRooms: response.data }));
        return {
          status: "berhasil",
          data: response.data,
        };
      } catch (error: any) {
        return {
          status: "error",
          error: error.response.data,
        };
      }
    },
  }))
);

export default useRoomsApi;
