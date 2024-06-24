/** @format */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { api } from "@/services/baseURL";
import GalleriesTypes from "@/types/GalleriesTypes";
// api galleries
type Props = {
  page?: number;
  limit?: number;
  search?: string;
  random?: boolean;
};

type Store = {
  dtGalleries: any;
  dtAllGalleries: {
    data: GalleriesTypes[];
  };
  setGalleries: ({ page, limit, search }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
  setGalleriesAll: ({ search, random }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
};

const useGalleriesApi = create(
  devtools<Store>((set, get) => ({
    dtGalleries: [],
    dtAllGalleries: {
      data: [],
    },
    setGalleries: async ({ page = 1, limit = 10, search }) => {
      try {
        const response = await api({
          method: "get",
          url: `/galleries`,
          params: {
            limit,
            page,
            search,
          },
        });
        set((state) => ({ ...state, dtGalleries: response.data }));
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
    setGalleriesAll: async ({ search, random }) => {
      try {
        const response = await api({
          method: "get",
          url: `/galleries/all`,
          params: {
            search,
            random,
          },
        });
        set((state) => ({ ...state, dtAllGalleries: response.data }));
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

export default useGalleriesApi;
