/** @format */

import { useRouter } from "next/navigation";
import React, { FC, useEffect } from "react";

type Props = {
  mhsWatch: number | string;
  setValue: any;
  time: number;
};

const MhsBar: FC<Props> = ({ mhsWatch, setValue, time }) => {
  const router = useRouter();
  const getUrl = () => {
    const fullUrl = window.location.href;
    // cek params
    const url = new URL(fullUrl);
    const params = new URLSearchParams(url.search);
    const mhsParams = params.get("mhs_id");
    return { url, params, mhsParams };
  };
  const barMhs = (mhs_id: string) => {
    const { url, params, mhsParams } = getUrl();
    // Hapus parameter sort sebelum menambahkan yang baru
    params.delete("mhs_id");
    // Tambahkan parameter sort baru
    params.append("mhs_id", mhs_id);
    // Memperbarui query string dengan sortby baru
    url.search = params.toString();
    router.push(url.toString());
  };
  // jika mhsParams ada
  useEffect(() => {
    setTimeout(() => {
      const { mhsParams } = getUrl();
      if (!mhsParams) {
        barMhs("");
      } else {
        setValue("mhs_id", parseInt(mhsParams));
      }
    }, time);
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (mhsWatch) {
      barMhs(mhsWatch.toString());
    } else {
      barMhs("");
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mhsWatch]);

  return <></>;
};

export default MhsBar;
