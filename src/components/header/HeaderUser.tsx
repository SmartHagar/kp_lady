/** @format */
"use client";
import { useMenuContext } from "@/context/MenuContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useWelcomeContext } from "@/context/WelcomeContext";
import { BsList } from "react-icons/bs";
import Mobile from "../navbar/Mobile";
import { motion, AnimatePresence } from "framer-motion";
import ListMenu from "../navbar/ListMenu";
import BtnDefault from "../button/BtnDefault";
import LoadingSpiner from "../loading/LoadingSpiner";

type Props = {};

const HeaderUser = (props: Props) => {
  const { isOpen, setIsOpen } = useMenuContext();
  const { welcome, setWelcome } = useWelcomeContext();
  const pathname = usePathname();
  // state
  const [isFixed, setIsFixed] = useState(false);
  const [loadLogin, setLoadLogin] = useState(false);
  // router
  const router = useRouter();

  useEffect(() => {
    setWelcome("Selamat Datang di Halaman User");

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
  // mendapatkan posisi scroll
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    // Set header to fixed after scrolling 50px
    if (currentScrollY >= 50) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };

  useEffect(() => {
    // Menambahkan event listener untuk scroll
    window.addEventListener("scroll", handleScroll);

    // Kembali ke atas saat pertama kali dirender
    window.scrollTo(0, 0);

    return () => {
      // Menghapus event listener saat komponen dibongkar
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const loginPage = () => {
    setLoadLogin(true);
    router.push("/auth/login");
  };

  return (
    <header className={`z-50 relative`}>
      {/* <section className="hidden lg:block">
        <div className="bg-primary text-white py-2">
          <div className="md:container mx-auto">
            <MainNavbar />
          </div>
        </div>
        <div
          className={`bg-white text-fourth py-3 border ${
            isFixed ? "fixed top-0 left-0 right-0" : ""
          }`}
        >
          <div className="md:container mx-auto">
            <NavbarComp />
          </div>
        </div>
      </section> */}
      {/* for mobile */}
      <section className="py-2 px-2 text-third fixed z-50 w-full flex justify-end">
        {/* button menu */}
        <BsList
          className="text-3xl font-bold cursor-pointer select-none"
          onClick={handleClick}
        />
      </section>
      {/* mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.section
            className="overflow-hidden md:w-80 w-full flex flex-col fixed right-0 bg-primary rounded-l-xl z-20 h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: ListMenu.length * 0.1 } }}
          >
            <h1 className="text-4xl font-sacramento font-bold text-center mt-2 text-third">
              Terminal 12
            </h1>
            <Mobile />
            {loadLogin ? (
              <LoadingSpiner />
            ) : (
              <BtnDefault
                addClass="bg-third w-fit self-center hover:bg-third/80 hover:text-white"
                onClick={loginPage}
              >
                Login
              </BtnDefault>
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </header>
  );
};

export default HeaderUser;
