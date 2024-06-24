/** @format */

import { useRouter } from "next/navigation";
import React, { FC, useEffect } from "react";

type Props = {
  prodiWatch: number | string;
  setValue: any;
  time: number;
};

const Prodi: FC<Props> = ({ prodiWatch, setValue, time }) => {
  const router = useRouter();
  const getUrl = () => {
    const fullUrl = window.location.href;
    // cek params
    const url = new URL(fullUrl);
    const params = new URLSearchParams(url.search);
    const prodiParams = params.get("prodi_id");
    return { url, params, prodiParams };
  };
  const barProdi = (prodi_id: string) => {
    const { url, params, prodiParams } = getUrl();
    // Hapus parameter sort sebelum menambahkan yang baru
    params.delete("prodi_id");
    // Tambahkan parameter sort baru
    params.append("prodi_id", prodi_id);
    // Memperbarui query string dengan sortby baru
    url.search = params.toString();
    router.push(url.toString());
  };
  // jika prodiParams ada
  useEffect(() => {
    setTimeout(() => {
      const { prodiParams } = getUrl();
      if (!prodiParams) {
        barProdi("");
      } else {
        setValue("prodi_id", parseInt(prodiParams));
      }
    }, time);
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (prodiWatch) {
      barProdi(prodiWatch.toString());
    } else {
      barProdi("");
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prodiWatch]);

  return <></>;
};

export default Prodi;
