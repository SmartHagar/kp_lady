/** @format */
"use client";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import PaginationDefault from "@/components/pagination/PaginationDefault";
import TablesDefault from "@/components/tables/TablesDefault";
import useRoomTypes from "@/stores/crud/RoomTypes";
import { useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
// roomTypes
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
  const { setRoomTypes, dtRoomTypes } = useRoomTypes();
  // state
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // search params
  const searchParams = useSearchParams();
  const sortby = searchParams.get("sortby") || "";
  const order = searchParams.get("order") || "";

  const fetchDataRoomTypes = async () => {
    const res = await setRoomTypes({
      page,
      limit,
      search,
      sortby,
      order,
    });
    setIsLoading(false);
  };
  useEffect(() => {
    fetchDataRoomTypes();

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, sortby, order]);
  // ketika search berubah
  useEffect(() => {
    setPage(1);
    fetchDataRoomTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, sortby, order]);

  // table
  const headTable = ["No", "Nama Type", "Keterangan", "Aksi"];
  const tableBodies = ["nm_type", "description"];
  return (
    <div className="flex-1 flex-col h-full overflow-auto overflow-x-hidden">
      {isLoading ? (
        <LoadingSpiner />
      ) : (
        <>
          <TablesDefault
            headTable={headTable}
            tableBodies={tableBodies}
            dataTable={dtRoomTypes?.data}
            page={page}
            limit={limit}
            setEdit={setEdit}
            setDelete={setDelete}
            ubah={true}
            hapus={true}
            sorter="nm_type"
          />
          {dtRoomTypes?.last_page > 1 && (
            <div className="mt-4">
              <PaginationDefault
                currentPage={dtRoomTypes?.current_page}
                totalPages={dtRoomTypes?.last_page}
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
