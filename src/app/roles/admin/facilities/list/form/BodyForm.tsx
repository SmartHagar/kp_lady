/** @format */
"use client";
import InputTextDefault from "@/components/input/InputTextDefault";
import { FC } from "react";

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
  return (
    <>
      <InputTextDefault
        label="Nama Fasilitas"
        name="nm_facility"
        register={register}
        required
        minLength={2}
        errors={errors.nm_facility}
        addClass="col-span-4"
      />

      <InputTextDefault
        label="Keterangan"
        name="description"
        register={register}
        errors={errors.description}
        addClass="col-span-4"
      />
    </>
  );
};

export default BodyForm;
