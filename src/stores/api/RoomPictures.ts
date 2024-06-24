/** @format */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { api } from "@/services/baseURL";
import RoomPicturesTypes from "@/types/RoomPicturesTypes";
// api roomPictures
type Props = {
  page?: number;
  limit?: number;
  search?: string;
  random?: boolean;
};

type Store = {
  dtRoomPictures: any;
  dtAllRoomPictures: {
    data: RoomPicturesTypes[];
  };
  setRoomPictures: ({ page, limit, search }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
  setRoomPicturesAll: ({ search, random }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
};

const useRoomPicturesApi = create(
  devtools<Store>((set, get) => ({
    dtRoomPictures: [],
    dtAllRoomPictures: {
      data: [],
    },
    setRoomPictures: async ({ page = 1, limit = 10, search }) => {
      try {
        const response = await api({
          method: "get",
          url: `/roomPictures`,
          params: {
            limit,
            page,
            search,
          },
        });
        set((state) => ({ ...state, dtRoomPictures: response.data }));
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
    setRoomPicturesAll: async ({ search, random }) => {
      try {
        const response = await api({
          method: "get",
          url: `/roomPictures/all`,
          params: {
            search,
            random,
          },
        });
        set((state) => ({ ...state, dtAllRoomPictures: response.data }));
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

export default useRoomPicturesApi;
