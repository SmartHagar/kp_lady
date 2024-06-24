/** @format */
"use client";
import { FC, useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
type Props = {
  perView?: number;
};

const Slider: FC<Props> = ({ perView = 1 }) => {
  const [images, setImages] = useState<string[]>([]);

  // Array berisi path gambar
  const imagePaths = [
    "/images/rooms/Terminal12_1.JPG",
    "/images/rooms/Terminal12_2.JPG",
    "/images/rooms/Terminal12_3.JPG",
    "/images/rooms/Terminal12_4.JPG",
    "/images/rooms/Terminal12_5.JPG",
    "/images/rooms/Terminal12_6.JPG",
  ];

  // Fungsi untuk mengacak urutan array
  const shuffleArray = (array: string[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    // Acak urutan array dan set ke state images
    setImages(shuffleArray([...imagePaths]));
  }, []);

  const slideCount = images?.length || 0;
  const shouldLoop = slideCount > perView;

  return (
    <div className="w-full h-full">
      <Swiper
        slidesPerView={perView}
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={shouldLoop}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
        breakpoints={{
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: perView,
            spaceBetween: 0,
          },
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              <Image src={image} alt={`anggota ${index + 1}`} fill />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
