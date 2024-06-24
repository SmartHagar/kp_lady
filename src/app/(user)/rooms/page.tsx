/** @format */

import { Suspense } from "react";
import ShowData from "./ShowData";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import Slider from "./Slider";

type Props = {};

const Rooms = (props: Props) => {
  return (
    <main className="w-full grow z-0 flex flex-col gap-y-20">
      <div className="h-screen grow">
        <div className="z-10 absolute bottom-20 left-4 md:left-20 md:w-96">
          <h1 className="text-3xl md:text-4xl font-semibold text-white text-shadow-xl mb-4">
            Nikmati Kehangatan dan Kenyamanan
          </h1>
          <p className="text-white text-shadow-lg md:text-lg">
            Setiap kamar dan suite kami dirancang dengan cermat untuk memberikan
            kenyamanan dan ketenangan maksimal bagi Anda. Dilengkapi dengan
            berbagai fasilitas modern.
          </p>
        </div>
        <Suspense fallback={<LoadingSpiner />}>
          <Slider />
        </Suspense>
      </div>
      <div className="md:container mx-auto w-full">
        <ShowData />
      </div>
    </main>
  );
};

export default Rooms;
