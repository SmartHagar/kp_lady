/** @format */

import { BASE_URL } from "./baseURL";
import Image from "next/image";
import moment from "moment";
import showRupiah from "./rupiah";

const getProperty = (obj: any, prop: any, index: number, setIndexBox: any) => {
  const angkatan = obj?.thn_angkatan?.substring(2);
  const mhs_angkatan = obj?.mhs?.thn_angkatan?.substring(2);
  let parts = prop.split(".");
  if (Array.isArray(parts)) {
    let last = parts.length > 1 ? parts.pop() : parts;
    // jika gabungan antara pangkat golongan dan ruang
    if (last.includes("mulai_seles")) {
      const mulai = moment(obj["mulai"], "HH:mm:ss").format("HH:mm");
      const seles = moment(obj["seles"], "HH:mm:ss").format("HH:mm");
      return `${mulai} - ${seles}`;
    }
    if (last.includes("progdi_smt")) {
      const progdi = obj["prodi"]["singkat"];
      const smt = obj["matkul"]["semester"];
      return `${progdi}-${smt}`;
    }
    if (last.includes("NPM_FULL")) {
      return `${obj["prodi"]["kode"]}${angkatan}${obj["NPM"]}`;
    }
    if (last.includes("MHS_NPM_FULL")) {
      return `${obj["mhs"]["prodi"]["kode"]}${mhs_angkatan}${obj["mhs"]["NPM"]}`;
    }
    // memisahkan properti dalam bentuk array
    let l = parts.length,
      i = 1,
      current = parts[0];
    while ((obj = obj[current]) && i < l) {
      current = parts[i];
      i++;
    }
    if (typeof obj === "object") {
      return obj ? obj[last] : "";
    }
    // date pros
    const dateProps = ["tgl_mulai", "tgl_selesai", "tgl", "deadline"];
    // cek date
    if (dateProps.includes(prop)) {
      return moment(obj).format("DD/MM/YYYY");
    }
    // cek rupiah
    const rupiahProps = ["biaya", "price"];
    // cek rupiah
    if (rupiahProps.includes(prop)) {
      return showRupiah(obj);
    }
    // cek image
    const fileProps = ["gambar", "foto", "file_materi", "picture"];
    // cek image
    if (fileProps.includes(prop)) {
      const extension = obj.split(".").pop();
      return (
        obj &&
        (["png", "jpg", "jpeg"].includes(extension) ? (
          <Image
            src={`${BASE_URL}/${obj}`}
            loading="lazy"
            width={70}
            height={70}
            alt=""
            className="cursor-pointer"
            onClick={setIndexBox ? () => setIndexBox(index) : undefined}
          />
        ) : (
          <a
            href={`${BASE_URL}/${obj}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-700"
          >
            Lihat File
          </a>
        ))
      );
    }
    return <p className="capitalize">{obj}</p>;
  } else {
    // eslint-disable-next-line no-throw-literal
    throw "parts is not valid array";
  }
};

export default getProperty;
