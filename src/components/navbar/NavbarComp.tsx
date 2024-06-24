/** @format */

"use client";
import ListMenu from "./ListMenu";
import { FC, useState } from "react";
import { usePathname } from "next/navigation";
import MenuItem from "./MenuItems";

type Props = {};

const NavbarComp: FC<Props> = ({}) => {
  const pathname = usePathname();
  const [hoverIndex, setHoverIndex] = useState<null | number>(null);

  return (
    <div className="flex justify-center gap-x-64">
      <ul className="flex gap-x-4">
        {ListMenu.map((item, index) => (
          <MenuItem
            key={index}
            item={item}
            index={index}
            hoverIndex={hoverIndex}
            setHoverIndex={setHoverIndex}
            pathname={pathname}
          />
        ))}
      </ul>
    </div>
  );
};

export default NavbarComp;
