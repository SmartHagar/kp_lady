/** @format */
"use client";
import useRoomPicturesApi from "@/stores/api/RoomPictures";
import { FC, useCallback, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import { BASE_URL } from "@/services/baseURL";
import RoomPicturesTypes from "@/types/RoomPicturesTypes";
type Props = {
  perView?: number;
};

const SliderRooms: FC<Props> = ({ perView = 1 }) => {
  const { setRoomPicturesAll, dtAllRoomPictures } = useRoomPicturesApi();
  const fetchData = useCallback(() => {
    setRoomPicturesAll({ random: true });
  }, [setRoomPicturesAll]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const slideCount = dtAllRoomPictures?.data?.length || 0;
  const shouldLoop = slideCount > perView;
  return (
    <div className="w-full h-full">
      <Swiper
        slidesPerView={perView}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={true}
        loop={shouldLoop}
        modules={[Pagination, Autoplay, Navigation]}
        className="mySwiper"
        breakpoints={{
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: perView,
            spaceBetween: 0,
          },
        }}
      >
        {dtAllRoomPictures?.data &&
          dtAllRoomPictures?.data?.map((item: RoomPicturesTypes) => (
            <SwiperSlide key={item.id}>
              <div className="relative h-full w-full">
                <Image src={`${BASE_URL}/${item.picture}`} alt="anggota" fill />
                <div className="z-10 absolute bottom-0 left-0 w-full bg-black/50"></div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default SliderRooms;
