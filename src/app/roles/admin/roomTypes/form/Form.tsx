/** @format */
"use client";
import InputTextDefault from "@/components/input/InputTextDefault";
import ModalDefault from "@/components/modal/ModalDefault";
import toastShow from "@/utils/toast-show";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import BodyForm from "./BodyForm";
import BtnDefault from "@/components/button/BtnDefault";
import submitData from "@/services/submitData";
import LoadingSpiner from "@/components/loading/LoadingSpiner";
import useRoomTypes from "@/stores/crud/RoomTypes";
import RoomTypesTypes from "@/types/RoomTypesTypes";
// roomTypes;
type Props = {
  showModal: boolean;
  setShowModal: (data: boolean) => void;
  dtEdit: any;
};

const Form = ({ showModal, setShowModal, dtEdit }: Props) => {
  // store
  const { addData, updateData } = useRoomTypes();
  // state
  const [isLoading, setIsLoading] = useState(false);
  // hook form
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    watch,
  } = useForm<RoomTypesTypes>();

  // reset form
  const resetForm = () => {
    setValue("id", "");
    setValue("nm_type", "");
    setValue("description", "");
  };

  // data edit
  useEffect(() => {
    if (dtEdit) {
      setValue("id", dtEdit.id);
      setValue("nm_type", dtEdit.nm_type);
      setValue("description", dtEdit.description);
    } else {
      resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal, dtEdit]);
  // simpan data
  const onSubmit: SubmitHandler<RoomTypesTypes> = async (row) => {
    //  submit data
    submitData({
      row,
      dtEdit,
      setIsLoading,
      setShowModal,
      addData,
      updateData,
      resetForm,
      toastShow,
    });
  };

  return (
    <ModalDefault
      title="Form Tipe Ruangan"
      showModal={showModal}
      setShowModal={setShowModal}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputTextDefault name="id" register={register} type="hidden" />
        <div className="grid grid-cols-4 gap-2 mb-4">
          <BodyForm
            register={register}
            errors={errors}
            dtEdit={dtEdit}
            control={control}
            watch={watch}
            setValue={setValue}
            showModal={showModal}
          />
        </div>
        <div>
          {isLoading ? (
            <LoadingSpiner />
          ) : (
            <BtnDefault onClick={handleSubmit(onSubmit)} type="submit">
              Simpan
            </BtnDefault>
          )}
        </div>
      </form>
    </ModalDefault>
  );
};

export default Form;
