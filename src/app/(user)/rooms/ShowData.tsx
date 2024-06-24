/** @format */
"use client";
import { BASE_URL } from "@/services/baseURL";
import showRupiah from "@/services/rupiah";
import useRoomTypesApi from "@/stores/api/RoomTypes";
import useRoomsApi from "@/stores/api/Rooms";
import RoomsTypes from "@/types/RoomsTypes";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type Props = {};

const ShowData = (props: Props) => {
  // state room_type_id
  const [roomTypeId, setRoomTypeId] = useState<number | string>("");
  // store
  const { setRoomsAll, dtRooms } = useRoomsApi();
  const { setRoomTypesAll, dtRoomTypes } = useRoomTypesApi();
  const fetchData = useCallback(async () => {
    await setRoomsAll({
      room_type_id: roomTypeId,
    });
    await setRoomTypesAll({});
  }, [setRoomsAll, roomTypeId, setRoomTypesAll]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  console.log({ dtRooms });

  return (
    <div className="flex flex-col grow mb-10 gap-y-6">
      <div className="flex justify-between">
        <span>Kategori</span>
        <div className="flex gap-x-4">
          <span
            className="text-primary hover:border-b-2 hover:border-primary cursor-pointer select-none"
            onClick={() => setRoomTypeId("")}
          >
            Semua
          </span>
          {dtRoomTypes?.data &&
            dtRoomTypes?.data?.map((x: any) => (
              <span
                className="text-primary hover:border-b-2 hover:border-primary cursor-pointer select-none"
                key={x.id}
                onClick={() => setRoomTypeId(x.id)}
              >
                {x.nm_type}
              </span>
            ))}
        </div>
      </div>
      {/* data rooms */}
      <div className="flex flex-col gap-y-8">
        {dtRooms?.data &&
          dtRooms?.data?.map((item: RoomsTypes, index: number) => {
            const genap = index % 2 === 0;
            const srcPicture =
              item?.room_picture && item?.room_picture[0]
                ? `${BASE_URL}/${item?.room_picture[0]?.picture}`
                : "/images/rooms/Terminal12_1.JPG";
            const facilities = item?.room_facility;
            return (
              <div className="flex" key={item.id}>
                <div
                  className={`relative flex flex-col ${
                    genap ? "md:flex-row" : "md:flex-row-reverse"
                  } w-full h-96 rounded-xl bg-white bg-clip-border text-gray-700 shadow-md`}
                >
                  <div className="relative m-0 w-full h-1/2 md:h-full md:w-2/5 shrink-0 overflow-hidden rounded-xl md:rounded-r-none bg-white bg-clip-border text-gray-700">
                    <Image
                      src={srcPicture}
                      alt="image"
                      fill
                      className="absolute z-50 top-0 right-0 bottom-0 left-0 h-full w-full object-cover"
                    />
                  </div>
                  {/* keterangan */}
                  <div className="p-6 md:h-full flex flex-col justify-between w-full overflow-auto">
                    <h6 className="mb-4 block font-sans text-base font-semibold uppercase leading-relaxed tracking-normal text-third antialiased">
                      {item.room_type?.nm_type}
                    </h6>
                    <div>
                      <h4 className="mb-2 block font-sans text-xl md:text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                        No. Ruangan : {item.room_number}
                      </h4>
                      <p className="my-2 md:text-lg ">
                        Fasilitas yang tersedia :{" "}
                        {facilities &&
                          facilities.map((x: any, idFacility: number) => (
                            <span key={x.id}>
                              ({x.quantity}) {x.facility.nm_facility}
                              {idFacility < facilities.length - 1 && ", "}
                            </span>
                          ))}
                      </p>
                      <p className="my-2 md:text-lg ">
                        Harga : {showRupiah(item.price)}
                      </p>
                    </div>
                    <p className="mb-8 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased"></p>
                    <a className="inline-block" href="#">
                      <button
                        className="flex select-none items-center gap-2 rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-primary transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                      >
                        Selengkapnya
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          aria-hidden="true"
                          className="h-4 w-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                          ></path>
                        </svg>
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ShowData;
