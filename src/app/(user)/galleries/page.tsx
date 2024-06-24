/** @format */

import Pictures from "./Pictures";

type Props = {};

const Rooms = (props: Props) => {
  return (
    <main className="w-full grow z-0 flex flex-col gap-y-20 mb-10">
      <div>
        <h1 className="text-3xl mt-10 text-center text-primary">Galeri</h1>
      </div>
      <div className="md:container mx-auto w-full">
        <Pictures />
      </div>
    </main>
  );
};

export default Rooms;
