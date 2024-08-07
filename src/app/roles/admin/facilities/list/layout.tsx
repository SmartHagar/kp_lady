/** @format */

import React from "react";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Daftar Fasilitas",
};

type Props = {
  children: React.ReactNode;
};

const layout = (props: Props) => {
  return props.children;
};

export default layout;
