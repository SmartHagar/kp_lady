/** @format */
"use client";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import PaginationDefault from "@/components/pagination/PaginationDefault";
import TablesDefault from "@/components/tables/TablesDefault";
import useRoomPictures from "@/stores/crud/RoomPictures";
import { useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import slide from "./slide";
import LightPlugins from "@/components/lightBox/LightPlugins";
// roomPictures
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
  const { setRoomPictures, dtRoomPictures } = useRoomPictures();
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

  const fetchDataRoomPictures = async () => {
    const res = await setRoomPictures({
      page,
      limit,
      search,
      sortby,
      order,
    });
    setIsLoading(false);
  };
  useEffect(() => {
    fetchDataRoomPictures();

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, sortby, order]);
  // ketika search berubah
  useEffect(() => {
    setPage(1);
    fetchDataRoomPictures();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, sortby, order]);

  // table
  const headTable = ["No", "No. Ruangan", "Gambar", "Aksi"];
  const tableBodies = ["room.room_number", "picture"];

  useEffect(() => {
    setSlides(slide(dtRoomPictures?.data));
  }, [dtRoomPictures?.data]);
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
            dataTable={dtRoomPictures?.data}
            page={page}
            limit={limit}
            setEdit={setEdit}
            setDelete={setDelete}
            ubah={true}
            hapus={true}
            sorter="created_at"
            setIndexBox={setIndexBox}
          />
          {dtRoomPictures?.last_page > 1 && (
            <div className="mt-4">
              <PaginationDefault
                currentPage={dtRoomPictures?.current_page}
                totalPages={dtRoomPictures?.last_page}
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
