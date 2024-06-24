/** @format */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { crud } from "@/services/baseURL";
import useLogin from "@/stores/auth/login";
import RoomFacilitiesTypes from "@/types/RoomFacilitiesTypes";
// store roomFacilities
type Props = {
  page?: number;
  limit?: number;
  search?: string;
  sortby?: string;
  order?: string;
};

type Store = {
  dtRoomFacilities: {
    last_page: number;
    current_page: number;
    data: RoomFacilitiesTypes[];
  };

  setRoomFacilities: ({
    page,
    limit,
    search,
    sortby,
    order,
  }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;

  setShowRoomFacilities: (id: number | string) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;

  addData: (
    data: RoomFacilitiesTypes
  ) => Promise<{ status: string; data?: any; error?: any }>;

  removeData: (
    id: number | string
  ) => Promise<{ status: string; data?: any; error?: any }>;

  updateData: (
    id: number | string,
    data: RoomFacilitiesTypes
  ) => Promise<{ status: string; data?: any; error?: any }>;
};

const useRoomFacilities = create(
  devtools<Store>((set, get) => ({
    dtRoomFacilities: {
      last_page: 0,
      current_page: 0,
      data: [],
    },
    setRoomFacilities: async ({
      page = 1,
      limit = 10,
      search,
      sortby,
      order,
    }) => {
      try {
        const token = await useLogin.getState().setToken();
        const response = await crud({
          method: "get",
          url: `/roomFacilities`,
          headers: { Authorization: `Bearer ${token}` },
          params: {
            limit,
            page,
            search,
            sortby,
            order,
          },
        });
        set((state) => ({ ...state, dtRoomFacilities: response.data.data }));
        return {
          status: "berhasil",
          data: response.data,
        };
      } catch (error: any) {
        return {
          status: "error",
          error: error.response?.data,
        };
      }
    },
    setShowRoomFacilities: async (id) => {
      try {
        const token = await useLogin.getState().setToken();
        const response = await crud({
          method: "get",
          url: `/roomFacilities/${id}`,
          headers: { Authorization: `Bearer ${token}` },
        });
        set((state) => ({ ...state, dtRoomFacilities: response.data.data }));
        return {
          status: "berhasil",
          data: response.data,
        };
      } catch (error: any) {
        return {
          status: "error",
          error: error.response?.data,
        };
      }
    },
    addData: async (row) => {
      try {
        const token = await useLogin.getState().setToken();
        const res = await crud({
          method: "post",
          url: `/roomFacilities`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: row,
        });
        set((prevState) => ({
          dtRoomFacilities: {
            last_page: prevState.dtRoomFacilities.last_page,
            current_page: prevState.dtRoomFacilities.current_page,
            data: [res.data.data, ...prevState.dtRoomFacilities.data],
          },
        }));
        return {
          status: "berhasil tambah",
          data: res.data,
        };
      } catch (error: any) {
        return {
          status: "error",
          data: error.response.data,
        };
      }
    },
    removeData: async (id) => {
      try {
        const token = await useLogin.getState().setToken();
        const res = await crud({
          method: "delete",
          url: `/roomFacilities/${id}`,
          headers: { Authorization: `Bearer ${token}` },
        });
        set((prevState) => ({
          dtRoomFacilities: {
            last_page: prevState.dtRoomFacilities.last_page,
            current_page: prevState.dtRoomFacilities.current_page,
            data: prevState.dtRoomFacilities.data.filter(
              (item: any) => item.id !== id
            ),
          },
        }));
        return {
          status: "berhasil hapus",
          data: res.data,
        };
      } catch (error: any) {
        return {
          status: "error",
          data: error.response.data,
        };
      }
    },
    updateData: async (id, row) => {
      try {
        const token = await useLogin.getState().setToken();
        const response = await crud({
          method: "PUT",
          url: `/roomFacilities/${id}`,
          headers: { Authorization: `Bearer ${token}` },
          data: row,
        });
        set((prevState) => ({
          dtRoomFacilities: {
            last_page: prevState.dtRoomFacilities.last_page,
            current_page: prevState.dtRoomFacilities.current_page,
            data: prevState.dtRoomFacilities.data.map((item: any) => {
              if (item.id === id) {
                return {
                  ...item,
                  ...response.data.data,
                };
              } else {
                return item;
              }
            }),
          },
        }));
        return {
          status: "berhasil update",
          data: response.data,
        };
      } catch (error: any) {
        return {
          status: "error",
          data: error.response.data,
        };
      }
    },
  }))
);

export default useRoomFacilities;
