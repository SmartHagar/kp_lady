/** @format */

import { useRouter } from "next/navigation";
import React, { FC, useEffect } from "react";

type Props = {
  tahunWatch: number | string;
  setValue: any;
  time: number;
};

const TahunBar: FC<Props> = ({ tahunWatch, setValue, time }) => {
  const router = useRouter();
  const getUrl = () => {
    const fullUrl = window.location.href;
    // cek params
    const url = new URL(fullUrl);
    const params = new URLSearchParams(url.search);
    const tahunParams = params.get("tahun");
    return { url, params, tahunParams };
  };
  const barTahun = (tahun: string) => {
    const { url, params } = getUrl();
    // Hapus parameter sort sebelum menambahkan yang baru
    params.delete("tahun");
    // Tambahkan parameter sort baru
    params.append("tahun", tahun.toString());
    // Memperbarui query string dengan sortby baru
    url.search = params.toString();
    router.push(url.toString());
  };
  // jika tahunParams ada
  useEffect(() => {
    setTimeout(() => {
      const { tahunParams } = getUrl();
      if (!tahunParams) {
        const tahun = new Date().getFullYear();
        setValue("tahun", tahun);
      } else {
        setValue("tahun", parseInt(tahunParams));
      }
    }, time);
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (tahunWatch) {
      barTahun(tahunWatch.toString());
    } else {
      barTahun("");
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tahunWatch]);

  return <></>;
};

export default TahunBar;
