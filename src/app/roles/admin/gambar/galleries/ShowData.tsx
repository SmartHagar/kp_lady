/** @format */
"use client";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import PaginationDefault from "@/components/pagination/PaginationDefault";
import TablesDefault from "@/components/tables/TablesDefault";
import useGalleries from "@/stores/crud/Galleries";
import { useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import slide from "./slide";
import LightPlugins from "@/components/lightBox/LightPlugins";
// galleries
type DeleteProps = {
  id?: number | string;
  isDelete: boolean;
};

type Props = {
  setDelete: ({ id, isDelete }: DeleteProps) => void;
  setEdit: (row: any) => void;
  search: string;
};

const ShowData: FC<Props> = ({ setDelete, setEdit, search }) => {
  const { setGalleries, dtGalleries } = useGalleries();
  // state
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [indexBox, setIndexBox] = useState<number>(-1);
  const [slides, setSlides] = useState<any>();
  // search params
  const searchParams = useSearchParams();
  const sortby = searchParams.get("sortby") || "";
  const order = searchParams.get("order") || "";

  const fetchDataGalleries = async () => {
    const res = await setGalleries({
      page,
      limit,
      search,
      sortby,
      order,
    });
    setIsLoading(false);
  };
  useEffect(() => {
    fetchDataGalleries();

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, sortby, order]);
  // ketika search berubah
  useEffect(() => {
    setPage(1);
    fetchDataGalleries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, sortby, order]);

  // table
  const headTable = ["No", "Gambar", "Keterangan", "Aksi"];
  const tableBodies = ["picture", "description"];

  useEffect(() => {
    setSlides(slide(dtGalleries?.data));
  }, [dtGalleries?.data]);
  return (
    <div className="flex-1 flex-col h-full overflow-auto overflow-x-hidden">
      {/* lightBox */}
      <LightPlugins index={indexBox} setIndex={setIndexBox} slides={slides} />
      {isLoading ? (
        <LoadingSpiner />
      ) : (
        <>
          <TablesDefault
            headTable={headTable}
            tableBodies={tableBodies}
            dataTable={dtGalleries?.data}
            page={page}
            limit={limit}
            setEdit={setEdit}
            setDelete={setDelete}
            ubah={true}
            hapus={true}
            sorter="created_at"
            setIndexBox={setIndexBox}
          />
          {dtGalleries?.last_page > 1 && (
            <div className="mt-4">
              <PaginationDefault
                currentPage={dtGalleries?.current_page}
                totalPages={dtGalleries?.last_page}
                setPage={setPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ShowData;
