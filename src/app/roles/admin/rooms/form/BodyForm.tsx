/** @format */
"use client";
import InputRupiah from "@/components/input/InputRupiah";
import InputTextDefault from "@/components/input/InputTextDefault";
import SelectFromDb from "@/components/select/SelectFromDB";
import useRoomTypesApi from "@/stores/api/RoomTypes";
import { FC, useCallback, useEffect } from "react";

import "react-datepicker/dist/react-datepicker.css";

type Props = {
  register: any;
  errors: any;
  dtEdit: any;
  control: any;
  watch: any;
  setValue: any;
  showModal: boolean;
};

const BodyForm: FC<Props> = ({
  register,
  errors,
  control,
  dtEdit,
  watch,
  setValue,
  showModal,
}) => {
  const { setRoomTypesAll, dtRoomTypes } = useRoomTypesApi();

  const fetchOption = useCallback(async () => {
    await setRoomTypesAll({});
  }, [setRoomTypesAll]);
  useEffect(() => {
    fetchOption();
    return () => {
      console.log("clean up");
    };
  }, [fetchOption]);

  return (
    <>
      {dtRoomTypes?.data && (
        <SelectFromDb
          label="Tipe Ruangan"
          placeholder="Pilih Tipe Ruangan"
          name="room_type_id"
          dataDb={dtRoomTypes?.data}
          body={["id", "nm_type"]}
          control={control}
          required
          errors={errors.room_type_id}
          addClass="col-span-3"
        />
      )}
      <InputTextDefault
        label="No. Ruangan"
        name="room_number"
        register={register}
        required
        min={1}
        type="number"
        valueAsNumber
        errors={errors.room_number}
        addClass="col-span-1"
      />
      <InputTextDefault
        label="Keterangan"
        name="description"
        register={register}
        errors={errors.description}
        addClass="col-span-4"
      />
      <InputRupiah
        label="Harga"
        name="price"
        control={control}
        required
        errors={errors.price}
        addClass="col-span-4 lg:col-span-2"
      />
    </>
  );
};

export default BodyForm;
