/** @format */

import Form from "./Form";
import Link from "next/link";

type Props = {};

const Login = (props: Props) => {
  return (
    <div className="min-h-screen bg-login bg-cover bg-center flex flex-col justify-center ">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <div className="backdrop-blur-lg bg-white/40 shadow w-full rounded-lg pb-3">
          <h1 className="px-5 text-center pt-2">
            Silahkan memasukan Email dan Password untuk akses halaman admin
          </h1>
          <Form />
        </div>
        <Link href="/" className="py-5">
          <div className="grid grid-cols-2 gap-1">
            <div className="text-center sm:text-left whitespace-nowrap">
              <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 inline-block align-text-top"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <span className="inline-block ml-1 text-fourth">
                  Kembali Ke Halaman Utama
                </span>
              </button>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Login;
