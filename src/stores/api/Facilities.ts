/** @format */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { api } from "@/services/baseURL";
// api facilities
type Props = {
  page?: number;
  limit?: number;
  search?: string;
};

type Store = {
  dtFacilities: any;
  setFacilities: ({ page, limit, search }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
  setFacilitiesAll: ({ search }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
};

const useFacilitiesApi = create(
  devtools<Store>((set, get) => ({
    dtFacilities: [],
    setFacilities: async ({ page = 1, limit = 10, search }) => {
      try {
        const response = await api({
          method: "get",
          url: `/facilities`,
          params: {
            limit,
            page,
            search,
          },
        });
        set((state) => ({ ...state, dtFacilities: response.data }));
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
    setFacilitiesAll: async ({ search }) => {
      try {
        const response = await api({
          method: "get",
          url: `/facilities/all`,
          params: {
            search,
          },
        });
        set((state) => ({ ...state, dtFacilities: response.data }));
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

export default useFacilitiesApi;
