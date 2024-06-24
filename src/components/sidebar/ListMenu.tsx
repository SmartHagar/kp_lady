/** @format */
import MenuTypes from "@/types/MenuTypes";

import { BsBasket, BsHouseDoor } from "react-icons/bs";

const createUrl = (path: string) => `/roles/admin${path}`;

const ListMenu: MenuTypes[] = [
  {
    name: "Home",
    href: createUrl("/dashboard"),
    icon: <BsHouseDoor />,
  },
  {
    name: "Tipe Ruangan",
    href: createUrl("/roomTypes"),
    icon: <BsBasket />,
  },
  {
    name: "Ruangan",
    href: createUrl("/rooms"),
    icon: <BsBasket />,
  },
  {
    name: "Fasilitas",
    slug: "facilities",
    icon: <BsBasket />,
    subMenus: [
      {
        name: "Daftar",
        href: createUrl("/facilities/list"),
      },
      {
        name: "Ruangan",
        href: createUrl("/facilities/rooms"),
      },
    ],
  },
  {
    name: "Gambar",
    slug: "gambar",
    icon: <BsBasket />,
    subMenus: [
      {
        name: "Ruangan",
        href: createUrl("/gambar/rooms"),
      },
      {
        name: "Galeri",
        href: createUrl("/gambar/galleries"),
      },
    ],
  },
];

export default ListMenu;
