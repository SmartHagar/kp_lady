/** @format */
"use client";
import { useMenuContext } from "@/context/MenuContext";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useWelcomeContext } from "@/context/WelcomeContext";
import { GiHamburgerMenu } from "react-icons/gi";

type Props = {};

const HeaderComp = (props: Props) => {
  const { isOpen, setIsOpen } = useMenuContext();
  const { welcome, setWelcome } = useWelcomeContext();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/admin") {
      setWelcome("Selamat Datang di Halaman Admin");
    } else {
      // split the pathname
      const path = pathname?.split("/");
      setWelcome(`Halaman ${path[path.length - 1]}`);
    }

    return () => {};
  }, [pathname, setWelcome]);

  // ketika pathname berubah
  useEffect(() => {
    setIsOpen(false);
  }, [pathname, setIsOpen]);
  // console.log({ isOpen });
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex justify-between lg:justify-center w-full mx-2 fixed top-0 left-0 right-0 z-50">
      <h3 className="capitalize text-xl z-50 font-bold">{welcome}</h3>
      <GiHamburgerMenu
        className="lg:hidden cursor-pointer z-50 select-none mr-6 self-center "
        onClick={handleClick}
      />
    </div>
  );
};

export default HeaderComp;
