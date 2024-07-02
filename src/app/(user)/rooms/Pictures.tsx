/** @format */

import LightPlugins from "@/components/lightBox/LightPlugins";
import { BASE_URL } from "@/services/baseURL";
import useRoomPicturesApi from "@/stores/api/RoomPictures";
import RoomPicturesTypes from "@/types/RoomPicturesTypes";
import React, { useCallback, useEffect, useState } from "react";
import PhotoAlbum from "react-photo-album";

type Props = {
  room_id: string | number;
};

const Pictures: React.FC<Props> = ({ room_id }) => {
  // state
  const [gallery, setGallery] = useState<any>();
  const [indexBox, setIndexBox] = useState<number>(-1);
  //   store
  const { setByRoomId, dtRoomPictures } = useRoomPicturesApi();
  //   get room pictures
  const fetchData = useCallback(
    async (roomId: string | number) => {
      await setByRoomId(roomId);
    },
    [setByRoomId]
  );
  //   first render
  useEffect(() => {
    room_id && fetchData(room_id);
    return () => {};
  }, [fetchData, room_id, setByRoomId]);

  // add gallery
  const slide = (data: RoomPicturesTypes[]) => {
    const dtImages = data?.map((row: RoomPicturesTypes) => {
      return {
        src: `${BASE_URL}/${row?.picture}`,
        width: 800,
        height: 600,
      };
    });
    setGallery(dtImages);
  };

  useEffect(() => {
    dtRoomPictures?.data && slide(dtRoomPictures?.data);
  }, [dtRoomPictures]);

  return (
    <div className="w-full h-full">
      <PhotoAlbum
        layout="rows"
        photos={gallery}
        onClick={({ index: current }) => setIndexBox(current)}
        targetRowHeight={300}
      />
      {/* lightBox */}
      <LightPlugins index={indexBox} setIndex={setIndexBox} slides={gallery} />
    </div>
  );
};

export default Pictures;
