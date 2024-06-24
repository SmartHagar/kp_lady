/** @format */
"use client";
import InputTextDefault from "@/components/input/InputTextDefault";
import SelectFromDb from "@/components/select/SelectFromDB";
import useFacilitiesApi from "@/stores/api/Facilities";
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
  const { setFacilitiesAll, dtFacilities } = useFacilitiesApi();

  const fetchOption = useCallback(async () => {
    await setRoomsAll({});
    await setFacilitiesAll({});
  }, [setFacilitiesAll, setRoomsAll]);
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
      {dtFacilities?.data && (
        <SelectFromDb
          label="Fasilitas"
          placeholder="Pilih Fasilitas"
          name="facility_id"
          dataDb={dtFacilities?.data}
          body={["id", "nm_facility"]}
          control={control}
          required
          errors={errors.facility_id}
          addClass="col-span-2"
        />
      )}
      <InputTextDefault
        label="Jumlah"
        name="quantity"
        register={register}
        required
        min={1}
        max={3}
        type="number"
        valueAsNumber
        errors={errors.quantity}
        addClass="col-span-1"
      />
    </>
  );
};

export default BodyForm;
