/** @format */

"use client";
import { FC, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type Props = {};

const MainNavbar: FC<Props> = ({}) => {
  const pathname = usePathname();
  console.log({ pathname });
  const route = useRouter();
  // state
  const [open, setOpen] = useState(false);
  const [loadLogin, setLoadLogin] = useState(false);

  return (
    <div className="flex w-full gap-x-80 text-sm relative">
      <h1 className="text-4xl font-sacramento font-bold text-center grow">
        Terminal 12
      </h1>
    </div>
  );
};

export default MainNavbar;
