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
        label="Nama Tipe"
        name="nm_type"
        register={register}
        required
        minLength={2}
        errors={errors.nm_type}
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
