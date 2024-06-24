/** @format */
"use client";
import { FC, useEffect, useState } from "react";
import ListMenu from "./ListMenu";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import BtnDefault from "../button/BtnDefault";
import useLogout from "@/stores/auth/logout";
import MenuTypes from "@/types/MenuTypes";
import SubMenu from "./SubMenu";
import LoadingSpiner from "../loading/LoadingSpiner";
import handleLogout from "@/app/auth/logout/logout";
import { useMenuContext } from "@/context/MenuContext";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  type?: string;
};

const MobileSide: FC<Props> = ({ type = "admin" }) => {
  const { isOpen, setIsOpen } = useMenuContext();
  const pathname = usePathname();
  const route = useRouter();
  const [menus, setMenus] = useState<MenuTypes[]>([]);
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const [loadLogout, setLoadLogout] = useState(false);
  // store
  const { setLogout } = useLogout();

  // ketika type berubah
  useEffect(() => {
    if (type === "admin") {
      setMenus(ListMenu);
    }
    return () => {};
  }, [type, setMenus]);

  // submenu
  const findOpenMenus = (menuList: MenuTypes[]) => {
    for (const menu of menuList) {
      // console.log({ slug, menu });
      if (menu?.href === pathname) {
        const second = pathname?.split("/");
        // if second.length > 0 remove index 0
        second.splice(0, 1);
        setOpenMenus(second);
      }
      // console.log({ menu });
      if (menu.subMenus) {
        // console.log({ menu });
        findOpenMenus(menu.subMenus);
      }
    }
  };

  useEffect(() => {
    menus && findOpenMenus(menus);
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menus, pathname]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: -300, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 300, opacity: 0 }}
        >
          <div className="h-full px-3 py-4 overflow-auto bg-fourth/80 text-third">
            <div className="flex flex-col gap-4 h-full sidebar w-full overflow-auto">
              <ul className="space-y-2 grow w-full h-full overflow-auto">
                {menus &&
                  menus.map((menu, index) => {
                    const isActive = pathname === menu.href;
                    const subMenus = menu?.subMenus;
                    const { name, icon, slug } = menu;
                    return subMenus ? (
                      SubMenu({
                        subMenus,
                        name,
                        icon,
                        slug,
                        index,
                        pathname,
                        openMenus,
                      })
                    ) : (
                      <li key={index}>
                        <Link
                          href={menu.href || "#"}
                          className={`flex w-full items-center p-2 hover:text-fifth transition-all duration-300 rounded-lg group ${
                            isActive && "text-fifth font-bold"
                          }`}
                        >
                          {icon}
                          <span className="ms-3">{name}</span>
                        </Link>
                      </li>
                    );
                  })}
              </ul>
              {loadLogout ? (
                <LoadingSpiner />
              ) : (
                <div className="flex justify-center">
                  <BtnDefault
                    addClass="bg-secondary text-fourth"
                    onClick={() =>
                      handleLogout({ setLogout, setLoadLogout, route })
                    }
                  >
                    Logout
                  </BtnDefault>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileSide;
