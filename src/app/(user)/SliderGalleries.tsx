/** @format */
"use client";
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
import useGalleriesApi from "@/stores/api/Galleries";
import GalleriesTypes from "@/types/GalleriesTypes";
type Props = {
  perView?: number;
};

const SliderGalleries: FC<Props> = ({ perView = 1 }) => {
  const { setGalleriesAll, dtAllGalleries } = useGalleriesApi();
  const fetchData = useCallback(() => {
    setGalleriesAll({ random: true });
  }, [setGalleriesAll]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const slideCount = dtAllGalleries?.data?.length || 0;
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
        {dtAllGalleries?.data &&
          dtAllGalleries?.data?.map((item: GalleriesTypes) => (
            <SwiperSlide key={item.id}>
              <div className="relative h-full w-full">
                <Image src={`${BASE_URL}/${item.picture}`} alt="anggota" fill />
                <div className="z-10 absolute bottom-0 left-0 w-full bg-black/50">
                  {/* <p className="text-center text-white z-50">
                    {item.room?.room_number}
                  </p> */}
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default SliderGalleries;
