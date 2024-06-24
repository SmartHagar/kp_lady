/** @format */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { crud } from "@/services/baseURL";
import useLogin from "@/stores/auth/login";
import GalleriesTypes from "@/types/GalleriesTypes";

// crud galleries

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
  dtGalleries: {
    last_page: number;
    current_page: number;
    data: GalleriesTypes[];
  };
  showGalleries: GalleriesTypes;
  setGalleries: ({
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
  setShowGalleries: (id: string | number) => Promise<{
    status: string;
    data?: {};
    error?: {};
  }>;
  addData: (
    data: GalleriesTypes
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

const useGalleries = create(
  devtools<Store>((set, get) => ({
    setFormData: (row: GalleriesTypes) => {
      const formData = new FormData();
      formData.append("description", row.description as string);
      formData.append("picture", row.picture as string);
      return formData;
    },
    dtGalleries: {
      last_page: 0,
      current_page: 0,
      data: [],
    },
    showGalleries: [] as unknown as GalleriesTypes,
    setGalleries: async ({
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
          url: `/galleries`,
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
        set((state) => ({ ...state, dtGalleries: response.data.data }));
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
    setShowGalleries: async (id) => {
      try {
        const token = await useLogin.getState().setToken();
        const response = await crud({
          method: "get",
          url: `/galleries/${id}`,
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log({ response });
        set((state) => ({ ...state, showGalleries: response.data.data }));
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
          url: `/galleries`,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        });
        set((prevState: any) => ({
          dtGalleries: {
            last_page: prevState.dtGalleries.last_page,
            current_page: prevState.dtGalleries.current_page,
            data: [res.data.data, ...prevState.dtGalleries.data],
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
          url: `/galleries/${id}`,
          headers: { Authorization: `Bearer ${token}` },
        });
        set((prevState: any) => ({
          dtGalleries: {
            last_page: prevState.dtGalleries.last_page,
            current_page: prevState.dtGalleries.current_page,
            data: prevState.dtGalleries.data.filter(
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
          url: `/galleries/${id}`,
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
          dtGalleries: {
            last_page: prevState.dtGalleries.last_page,
            current_page: prevState.dtGalleries.current_page,
            data: prevState.dtGalleries.data.map((item: any) => {
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

export default useGalleries;
