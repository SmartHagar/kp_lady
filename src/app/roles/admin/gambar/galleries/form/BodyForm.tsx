/** @format */
"use client";
import InputFile from "@/components/input/InputFile";
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
      <InputFile
        label="Gambar"
        name="picture"
        register={register}
        addClass="col-span-4"
        setValue={setValue}
        required
        errors={errors.picture}
        fileEdit={dtEdit?.picture}
        accept={".jpg, .jpeg, .png"}
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
