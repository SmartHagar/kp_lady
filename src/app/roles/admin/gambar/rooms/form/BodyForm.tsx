/** @format */
"use client";
import InputFile from "@/components/input/InputFile";
import SelectFromDb from "@/components/select/SelectFromDB";
import useRoomsApi from "@/stores/api/Rooms";
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
  const { setRoomsAll, dtRooms } = useRoomsApi();

  const fetchOption = useCallback(async () => {
    await setRoomsAll({});
  }, [setRoomsAll]);
  // call fetch option
  useEffect(() => {
    fetchOption();
    return () => {
      console.log("clean up");
    };
  }, [fetchOption]);
  return (
    <>
      {dtRooms?.data && (
        <SelectFromDb
          label="Ruangan"
          placeholder="Pilih Ruangan"
          name="room_id"
          dataDb={dtRooms?.data}
          body={["id", "room_number"]}
          control={control}
          required
          errors={errors.room_id}
          addClass="col-span-1"
        />
      )}
      <InputFile
        label="Gambar"
        name="picture"
        register={register}
        addClass="col-span-4"
        setValue={setValue}
        required
        errors={errors.picture}
        fileEdit={dtEdit?.picture}
        accept={"image/*"}
      />
    </>
  );
};

export default BodyForm;
