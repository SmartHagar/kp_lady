/** @format */

import FooterComp from "@/components/footer/FooterComp";
import { ReactNode } from "react";
import MenuContextProvider from "@/context/MenuContext";
import WelcomeContextProvider from "@/context/WelcomeContext";
import "@/assets/style/bgAnimation.css";
import Sidebar from "@/components/sidebar/Sidebar";
import HeaderComp from "@/components/header/HeaderComp";
import MobileSide from "@/components/sidebar/Mobile";
import Auth from "./Auth";

type Props = {
  children: ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <MenuContextProvider>
      <WelcomeContextProvider>
        <div className="w-full font-lato text-black overflow-hidden relative">
          <ul className="background z-0">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          {/* sidebar */}
          <div className="fixed left-0 top-0 bottom-0 lg:w-52 bg-primary z-50 hidden lg:block">
            <Sidebar />
          </div>
          <div className="backdrop-blur-sm  w-full flex z-10 overflow-hidden">
            <div className="lg:ml-52 flex flex-col min-h-screen h-screen grow overflow-hidden w-full ">
              {/* judul */}
              <div className="h-16 items-center shadow-sm shadow-fourth">
                <HeaderComp />
              </div>
              {/* mobile menu */}
              <MobileSide />
              {/* content */}
              <div className="grow max-h-full px-4 lg:mr-2 rounded-lg py-2 overflow-hidden">
                {children}
              </div>
              {/* footer */}
              <div className="min-h-12 w-full flex items-center justify-center bg-primary text-white">
                <FooterComp />
              </div>
            </div>
          </div>
        </div>
        <Auth />
      </WelcomeContextProvider>
    </MenuContextProvider>
  );
};

export default layout;
