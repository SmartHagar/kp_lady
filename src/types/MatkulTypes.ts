/** @format */
// matkul
interface MatkulTypes {
  id: string | number;
  prodi_id: string | number;
  kd_matkul: string | number;
  nm_matkul: string;
  singkat: string;
  sks: number;
  semester: number;
  status: "aktif" | "nonaktif";
}

export default MatkulTypes;
