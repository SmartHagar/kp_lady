/** @format */

import { FC } from "react";
import Link from "next/link";
import { BsArrowDownShort, BsArrowRightShort } from "react-icons/bs";
import { AnimatePresence } from "framer-motion";
import SubMenu from "./SubMenuNav";

interface Props {}

interface MenuItemProps {
  item: any;
  index: number;
  hoverIndex: number | null;
  setHoverIndex: (index: number | null) => void;
  pathname: string;
}

const MenuItem: FC<MenuItemProps> = ({
  item,
  index,
  hoverIndex,
  setHoverIndex,
  pathname,
}) => {
  const isActive = pathname === item.href;
  const isHovered = hoverIndex === index;

  return (
    <li
      onMouseEnter={() => setHoverIndex(index)}
      onMouseLeave={() => setHoverIndex(null)}
      className="relative"
    >
      <Link
        href={item.href || "#"}
        className={`${
          isActive ? "text-primary font-bold" : ""
        } flex items-center py-1 text-color-2 rounded-full hover:text-primary hover:font-bold transition-colors duration-300`}
      >
        <span>{item.name}</span>
        {item.subMenus && (
          <span className="ml-2">
            {isHovered ? <BsArrowDownShort /> : <BsArrowRightShort />}
          </span>
        )}
      </Link>
      {item.subMenus && (
        <AnimatePresence>
          {isHovered && <SubMenu subMenus={item.subMenus} />}
        </AnimatePresence>
      )}
    </li>
  );
};

export default MenuItem;
