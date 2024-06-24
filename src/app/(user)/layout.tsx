/** @format */

import { ReactNode } from "react";
import MenuContextProvider from "@/context/MenuContext";
import WelcomeContextProvider from "@/context/WelcomeContext";
import HeaderUser from "@/components/header/HeaderUser";
import FooterComp from "@/components/footer/FooterComp";
import "@/assets/style/bgAnimation.css";

type Props = {
  children: ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <MenuContextProvider>
      <WelcomeContextProvider>
        <main className="relative h-screen w-full font-lato text-black flex flex-col justify-between">
          <HeaderUser />
          <section className="grow z-10 flex">{children}</section>
          <div className="w-full z-10 bg-primary text-white">
            <FooterComp />
          </div>
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
        </main>
      </WelcomeContextProvider>
    </MenuContextProvider>
  );
};

export default layout;
