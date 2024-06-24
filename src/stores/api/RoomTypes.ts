/** @format */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { api } from "@/services/baseURL";
// api roomTypes
type Props = {
  page?: number;
  limit?: number;
  search?: string;
};

type Store = {
  dtRoomTypes: any;
  setRoomTypes: ({ page, limit, search }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
  setRoomTypesAll: ({ search }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
};

const useRoomTypesApi = create(
  devtools<Store>((set, get) => ({
    dtRoomTypes: [],
    setRoomTypes: async ({ page = 1, limit = 10, search }) => {
      try {
        const response = await api({
          method: "get",
          url: `/roomTypes`,
          params: {
            limit,
            page,
            search,
          },
        });
        set((state) => ({ ...state, dtRoomTypes: response.data }));
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
    setRoomTypesAll: async ({ search }) => {
      try {
        const response = await api({
          method: "get",
          url: `/roomTypes/all`,
          params: {
            search,
          },
        });
        set((state) => ({ ...state, dtRoomTypes: response.data }));
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

export default useRoomTypesApi;
