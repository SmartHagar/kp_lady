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
type Props = {
  type?: string;
};

const Sidebar: FC<Props> = ({ type = "admin" }) => {
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
    <>
      <aside
        className={`z-40 w-full h-screen transition-transform -translate-x-full sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="sidebar z-50 h-full px-3 pt-4 overflow-y-auto text-secondary flex flex-row-reverse justify-between sm:block">
          <div className="flex flex-col gap-4 h-full w-full overflow-hidden">
            <div className="flex h-24 border-b border-secondary items-center">
              <h1 className="text-4xl font-sacramento font-bold text-center grow text-third">
                Terminal 12
              </h1>
            </div>
            <ul className="space-y-2 grow w-full h-full overflow-auto select-none">
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
                        className={`flex w-full items-center p-2 text-color-2 hover:text-fifth hover:font-normal transition-all duration-300 rounded-lg group ${
                          isActive && "bg-my-orange text-fifth font-bold"
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
                  addClass="bg-third text-secondary"
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
      </aside>
    </>
  );
};

export default Sidebar;
