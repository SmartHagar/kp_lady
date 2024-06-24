/** @format */

import { BsFacebook, BsInstagram, BsTiktok, BsTwitter } from "react-icons/bs";

type Props = {};

const Sosmed = (props: Props) => {
  return (
    <div>
      <h1 className="text-xl md:text-2xl mt-10 mb-2 text-center">
        Sosial Media
      </h1>
      <div className="flex justify-center gap-4 text-lg">
        <BsTiktok className="text-red-500 cursor-pointer" title="Tiktok" />
        <BsInstagram
          className="text-pink-500 cursor-pointer"
          title="Instagram"
        />
        <BsTwitter className="text-sky-500 cursor-pointer" title="Twitter" />
        <BsFacebook className="text-blue-500 cursor-pointer" title="Facebook" />
      </div>
    </div>
  );
};

export default Sosmed;
