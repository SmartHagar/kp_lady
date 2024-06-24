/** @format */
"use client";
import { Suspense, useEffect, useState } from "react";

import Form from "./form/Form";
import ModalDelete from "@/components/modal/ModalDelete";
import { Toaster } from "react-hot-toast";
import toastShow from "@/utils/toast-show";
import BtnDefault from "@/components/button/BtnDefault";
import { useForm } from "react-hook-form";
import InputTextSearch from "@/components/input/InputTextSearch";
import useRooms from "@/stores/crud/Rooms";
import { useWelcomeContext } from "@/context/WelcomeContext";
import ShowData from "./ShowData";
// rooms
// type setDelete
type Delete = {
  id?: number | string;
  isDelete: boolean;
};

const Rooms = () => {
  // context
  const { setWelcome } = useWelcomeContext();
  // store
  const { removeData } = useRooms();
  // state
  const [showModal, setShowModal] = useState(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [idDel, setIdDel] = useState<number | string>();
  const [dtEdit, setDtEdit] = useState<any>();

  const handleTambah = () => {
    setShowModal(true);
    setDtEdit(null);
  };

  const setEdit = (row: any) => {
    setShowModal(true);
    setDtEdit(row);
  };

  const setDelete = async ({ id, isDelete }: Delete) => {
    setIdDel(id);
    if (isDelete) {
      const { data } = await removeData(idDel as number);
      toastShow({
        event: data,
      });
      setShowDelete(false);
    } else setShowDelete(true);
  };

  // hook form
  const {
    register,
    formState: { errors },
    watch,
  } = useForm();
  const cariWatch = watch("cari");

  useEffect(() => {
    setWelcome("Halaman Fasilitas Ruangan");

    return () => {};
  }, [setWelcome]);

  return (
    <div className="flex flex-col h-full w-full gap-y-2 overflow-hidden ">
      <div className="flex flex-col shrink">
        <Toaster />
        <Form
          dtEdit={dtEdit}
          showModal={showModal}
          setShowModal={setShowModal}
        />
        <ModalDelete
          showDel={showDelete}
          setShowDel={setShowDelete}
          setDelete={setDelete}
        />
        <div className="mb-4 flex justify-between">
          <p>Silahkan Mengolah data Ruangan</p>
          <div>
            <BtnDefault onClick={handleTambah}>Tambah Data</BtnDefault>
          </div>
        </div>
        <InputTextSearch
          name="cari"
          register={register}
          placeholder="Cari Data Ruangan"
          addClass="w-full"
        />
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <ShowData setDelete={setDelete} setEdit={setEdit} search={cariWatch} />
      </Suspense>
    </div>
  );
};

export default Rooms;
