/** @format */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { crud } from "@/services/baseURL";
import useLogin from "@/stores/auth/login";
import RoomPicturesTypes from "@/types/RoomPicturesTypes";

// crud roomPictures

type Props = {
  page?: number;
  limit?: number;
  search?: string;
  tipe?: string;
  sortby?: string;
  order?: string;
  jadwal_id?: number | string;
};

type Store = {
  dtRoomPictures: {
    last_page: number;
    current_page: number;
    data: RoomPicturesTypes[];
  };
  showRoomPictures: RoomPicturesTypes;
  setRoomPictures: ({
    page,
    limit,
    search,
    sortby,
    order,
    jadwal_id,
  }: Props) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
  setShowRoomPictures: (id: string | number) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
  addData: (
    data: RoomPicturesTypes
  ) => Promise<{ status: string; data?: any; error?: any }>;
  removeData: (
    data: any
  ) => Promise<{ status: string; data?: any; error?: any }>;
  updateData: (
    id: number | string,
    data: any
  ) => Promise<{ status: string; data?: any; error?: any }>;
  setFormData: any;
};

const useRoomPictures = create(
  devtools<Store>((set, get) => ({
    setFormData: (row: RoomPicturesTypes) => {
      const formData = new FormData();
      formData.append("room_id", row.room_id as string);
      formData.append("picture", row.picture as string);
      return formData;
    },
    dtRoomPictures: {
      last_page: 0,
      current_page: 0,
      data: [],
    },
    showRoomPictures: [] as unknown as RoomPicturesTypes,
    setRoomPictures: async ({
      page = 1,
      limit = 10,
      search,
      sortby,
      order,
      jadwal_id,
    }) => {
      try {
        const token = await useLogin.getState().setToken();
        const response = await crud({
          method: "get",
          url: `/roomPictures`,
          headers: { Authorization: `Bearer ${token}` },
          params: {
            limit,
            page,
            search,
            sortby,
            order,
            jadwal_id,
          },
        });
        set((state) => ({ ...state, dtRoomPictures: response.data.data }));
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
    setShowRoomPictures: async (id) => {
      try {
        const token = await useLogin.getState().setToken();
        const response = await crud({
          method: "get",
          url: `/roomPictures/${id}`,
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log({ response });
        set((state) => ({ ...state, showRoomPictures: response.data.data }));
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
      const formData = row?.picture ? get().setFormData(row) : row;
      try {
        const token = await useLogin.getState().setToken();
        const res = await crud({
          method: "post",
          url: `/roomPictures`,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        });
        set((prevState: any) => ({
          dtRoomPictures: {
            last_page: prevState.dtRoomPictures.last_page,
            current_page: prevState.dtRoomPictures.current_page,
            data: [res.data.data, ...prevState.dtRoomPictures.data],
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
          url: `/roomPictures/${id}`,
          headers: { Authorization: `Bearer ${token}` },
        });
        set((prevState: any) => ({
          dtRoomPictures: {
            last_page: prevState.dtRoomPictures.last_page,
            current_page: prevState.dtRoomPictures.current_page,
            data: prevState.dtRoomPictures.data.filter(
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
      delete row.id;
      const formData = row?.picture ? get().setFormData(row) : row;
      const token = await useLogin.getState().setToken();
      const headersImg = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      };
      try {
        const response = await crud({
          url: `/roomPictures/${id}`,
          method: "post",
          headers: row?.picture
            ? headersImg
            : {
                Authorization: `Bearer ${token}`,
              },
          data: formData,
          params: {
            _method: "PUT",
          },
        });
        set((prevState: any) => ({
          dtRoomPictures: {
            last_page: prevState.dtRoomPictures.last_page,
            current_page: prevState.dtRoomPictures.current_page,
            data: prevState.dtRoomPictures.data.map((item: any) => {
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

export default useRoomPictures;
