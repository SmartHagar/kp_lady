/** @format */

import React, { FC } from "react";

type Props = {
  value: string | number;
  register: any;
  required: boolean;
  name: string;
  defaultChecked?: boolean;
  errors: any;
  id: string;
};

const RadioInput: FC<Props> = ({
  value,
  register,
  required,
  name,
  defaultChecked,
  errors,
  id,
}) => {
  return (
    <div>
      <div className="flex gap-1 items-center">
        <input
          type="radio"
          value={value}
          id={id}
          name={name}
          {...register(name, { required })}
          className={`form-radio h-4 w-4 text-primary`}
          defaultChecked={defaultChecked}
        />
        <label htmlFor={id}>{value}</label>
      </div>
    </div>
  );
};

export default RadioInput;
