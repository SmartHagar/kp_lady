/** @format */
"use client";
import LightPlugins from "@/components/lightBox/LightPlugins";
import { BASE_URL } from "@/services/baseURL";
import useGalleriesApi from "@/stores/api/Galleries";
import GalleriesTypes from "@/types/GalleriesTypes";
import { useEffect, useState } from "react";
import PhotoAlbum from "react-photo-album";
type Props = {};

const Pictures = (props: Props) => {
  // state
  const [gallery, setGallery] = useState<any>();
  const [indexBox, setIndexBox] = useState<number>(-1);
  // store
  const { setGalleriesAll, dtAllGalleries } = useGalleriesApi();

  useEffect(() => {
    setGalleriesAll({});
  }, [setGalleriesAll]);

  // add gallery
  const slide = (data: GalleriesTypes[]) => {
    const dtImages = data?.map((row: GalleriesTypes) => {
      return {
        src: `${BASE_URL}/${row?.picture}`,
        width: 800,
        height: 600,
      };
    });
    setGallery(dtImages);
  };

  useEffect(() => {
    dtAllGalleries?.data && slide(dtAllGalleries?.data);
  }, [dtAllGalleries]);
  console.log({ gallery });
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
