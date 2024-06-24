/** @format */

import { BASE_URL } from "@/services/baseURL";
import GalleriesTypes from "@/types/GalleriesTypes";

const slide = (data: GalleriesTypes[]) => {
  const dtImages = data?.map((row: GalleriesTypes) => {
    return {
      src: `${BASE_URL}/${row?.picture}`,
      title: row.description,
      width: 3840,
      height: 5760,
    };
  });
  return dtImages;
};

export default slide;
