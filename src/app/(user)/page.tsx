/** @format */
"use client";
import { Suspense, useState } from "react";
import Link from "next/link";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import SliderRooms from "./SliderRooms";
import SliderGalleries from "./SliderGalleries";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <main className="w-full grow z-0 flex flex-col gap-y-20">
      <Suspense fallback={<LoadingSpiner />}>
        <div className="h-screen grow">
          <iframe
            src="https://www.youtube.com/embed/_vPhI3yzotM?si=AmJsw9KORU5rDmsz&amp;start=2&autoplay=1&mute=1&loop=1&controls=0&playlist=_vPhI3yzotM"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </Suspense>
      {/* rooms */}
      <div className="md:container mx-auto w-full h-screen">
        <div className="w-full grow h-3/4">
          <div className="flex justify-between mb-4">
            <h1 className="font-oswald text-4xl">Ruangan</h1>
            <Link
              href="/rooms"
              className="text-primary underline hover:text-third hover:font-bold transition-all duration-300"
            >
              Selengkapnya
            </Link>
          </div>
          <SliderRooms perView={3} />
        </div>
      </div>
      {/* galleries */}
      <div className="md:container mx-auto w-full h-screen">
        <div className="w-full grow h-3/4">
          <div className="flex justify-between mb-4">
            <h1 className="font-oswald text-4xl">Galeri</h1>
            <Link
              href="/galleries"
              className="text-primary underline hover:text-third hover:font-bold transition-all duration-300"
            >
              Selengkapnya
            </Link>
          </div>
          <SliderGalleries perView={3} />
        </div>
      </div>
    </main>
  );
}
