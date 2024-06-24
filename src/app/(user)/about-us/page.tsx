/** @format */

import Location from "./Location";

type Props = {};

const Profil = (props: Props) => {
  return (
    <main className="w-full grow z-0 flex flex-col gap-y-10 mb-10">
      <div>
        <h1 className="text-3xl mt-10 text-center text-primary">
          Tentang Terminal 12
        </h1>
      </div>
      <div className="md:container mx-auto w-full">
        <p>
          Terminal 12 Holtekamp menggabungkan keindahan alam dengan kenyamanan
          modern, menjadikannya tempat yang ideal untuk beristirahat dan
          bersantai. Pengunjung dapat menikmati berbagai aktivitas, seperti
          berenang dan berjemur.
        </p>
        <Location />
      </div>
    </main>
  );
};

export default Profil;
