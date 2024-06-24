/** @format */
"use client";
import React, {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type Props = {
  children: ReactNode;
};

type ContextProps = {
  welcome: string;
  setWelcome: Dispatch<SetStateAction<string>>;
};

const WelcomeContext = createContext<ContextProps>({
  welcome: "",
  setWelcome: () => {},
});

const WelcomeContextProvider: FC<Props> = ({ children }) => {
  const [welcome, setWelcome] = useState<string>("");
  return (
    <WelcomeContext.Provider value={{ welcome, setWelcome }}>
      {children}
    </WelcomeContext.Provider>
  );
};

export default WelcomeContextProvider;

export const useWelcomeContext = () => useContext(WelcomeContext);
