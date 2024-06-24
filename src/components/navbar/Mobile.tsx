/** @format */

import Link from "next/link";
import { FC } from "react";
// import ListMenu from "./ListMenu";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import ListMenu from "./ListMenu";
type Props = {};

const Mobile: FC<Props> = () => {
  // Define animation variants
  const variants = {
    hidden: { opacity: 0, x: +20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: +20 },
  };

  const pathname = usePathname();

  // state
  return (
    <div className="h-full px-3 py-4 overflow-hidden bg-menu-active">
      <ul className="space-y-2 font-medium text-white">
        {ListMenu &&
          ListMenu.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <motion.li
                key={index}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{
                  delay: index * 0.1,
                  exit: { delay: index * 0.1 },
                }}
                variants={variants}
              >
                <Link
                  href={item.href || "#"}
                  className={`${
                    isActive && "text-third font-bold"
                  } block py-1 text-color-2 rounded-full hover:text-third hover:font-bold transition-colors duration-300`}
                >
                  <span>{item.name}</span>
                </Link>
              </motion.li>
            );
          })}
      </ul>
    </div>
  );
};

export default Mobile;
