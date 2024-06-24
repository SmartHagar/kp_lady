/** @format */

import { BASE_URL } from "@/services/baseURL";
import showRupiah from "@/services/rupiah";
import RoomPicturesTypes from "@/types/RoomPicturesTypes";

const slide = (data: RoomPicturesTypes[]) => {
  const dtImages = data?.map((row: RoomPicturesTypes) => {
    return {
      src: `${BASE_URL}/${row?.picture}`,
      title: row.room.room_number,
      description: showRupiah(row.room.price),
      width: 3840,
      height: 5760,
    };
  });
  return dtImages;
};

export default slide;
