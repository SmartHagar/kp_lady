/** @format */
"use client";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import PaginationDefault from "@/components/pagination/PaginationDefault";
import TablesDefault from "@/components/tables/TablesDefault";
import useRoomFacilities from "@/stores/crud/RoomFacilities";
import { useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
// roomFacilities
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
  const { setRoomFacilities, dtRoomFacilities } = useRoomFacilities();
  // state
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // search params
  const searchParams = useSearchParams();
  const sortby = searchParams.get("sortby") || "";
  const order = searchParams.get("order") || "";

  const fetchDataRoomFacilities = async () => {
    const res = await setRoomFacilities({
      page,
      limit,
      search,
      sortby,
      order,
    });
    setIsLoading(false);
  };
  useEffect(() => {
    fetchDataRoomFacilities();

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, sortby, order]);
  // ketika search berubah
  useEffect(() => {
    setPage(1);
    fetchDataRoomFacilities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, sortby, order]);

  // table
  const headTable = ["No", "No. Ruangan", "Fasilitas", "Jumlah", "Aksi"];
  const tableBodies = ["room.room_number", "facility.nm_facility", "quantity"];
  return (
    <div className="flex-1 flex-col h-full overflow-auto overflow-x-hidden">
      {isLoading ? (
        <LoadingSpiner />
      ) : (
        <>
          <TablesDefault
            headTable={headTable}
            tableBodies={tableBodies}
            dataTable={dtRoomFacilities?.data}
            page={page}
            limit={limit}
            setEdit={setEdit}
            setDelete={setDelete}
            ubah={true}
            hapus={true}
            sorter="created_at"
          />
          {dtRoomFacilities?.last_page > 1 && (
            <div className="mt-4">
              <PaginationDefault
                currentPage={dtRoomFacilities?.current_page}
                totalPages={dtRoomFacilities?.last_page}
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
