/** @format */
"use client";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import PaginationDefault from "@/components/pagination/PaginationDefault";
import TablesDefault from "@/components/tables/TablesDefault";
import useRooms from "@/stores/crud/Rooms";
import { useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
// rooms
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
  const { setRooms, dtRooms } = useRooms();
  // state
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // search params
  const searchParams = useSearchParams();
  const sortby = searchParams.get("sortby") || "";
  const order = searchParams.get("order") || "";

  const fetchDataRooms = async () => {
    const res = await setRooms({
      page,
      limit,
      search,
      sortby,
      order,
    });
    setIsLoading(false);
  };
  useEffect(() => {
    fetchDataRooms();

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, sortby, order]);
  // ketika search berubah
  useEffect(() => {
    setPage(1);
    fetchDataRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, sortby, order]);

  // table
  const headTable = [
    "No",
    "No. Ruangan",
    "Tipe Ruangan",
    "Harga",
    "Keterangan",
    "Aksi",
  ];
  const tableBodies = [
    "room_number",
    "room_type.nm_type",
    "price",
    "description",
  ];
  return (
    <div className="flex-1 flex-col h-full overflow-auto overflow-x-hidden">
      {isLoading ? (
        <LoadingSpiner />
      ) : (
        <>
          <TablesDefault
            headTable={headTable}
            tableBodies={tableBodies}
            dataTable={dtRooms?.data}
            page={page}
            limit={limit}
            setEdit={setEdit}
            setDelete={setDelete}
            ubah={true}
            hapus={true}
            sorter="room_number"
          />
          {dtRooms?.last_page > 1 && (
            <div className="mt-4">
              <PaginationDefault
                currentPage={dtRooms?.current_page}
                totalPages={dtRooms?.last_page}
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
