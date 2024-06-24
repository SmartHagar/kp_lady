/** @format */

import Cookies from "js-cookie"; /** @format */
type Props = {
  setLogout: () => Promise<any>;
  setLoadLogout: React.Dispatch<React.SetStateAction<boolean>>;
  route: any;
};
const handleLogout = async ({ setLogout, setLoadLogout, route }: Props) => {
  setLoadLogout(true);
  const res = await setLogout();
  if (res?.status === "success") {
    // delete cookie
    Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("mhs");
    Cookies.remove("dosen");
    return route.push("/");
  }
};

export default handleLogout;
