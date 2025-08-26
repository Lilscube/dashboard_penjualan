"use client";

import React from "react";
import Link from "next/link";

import { FaTachometerAlt, FaBook, FaCartArrowDown } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";

export default function SidebarAdmin() {
    return (
        <>
            <div className="fixed left-0 top-0 h-screen w-64 bg-[#456882] text-white p-4">

                <div className="">
                    <h1 className="font-bold text-2xl text-center">Admin Portal</h1>
                </div>

                <div className="mt-8 space-y-2">
                    <Link href={"/dashboard"} className="">
                        <div className="flex items-center gap-2 border-b border-white pb-2 mt-2 text-white">
                            <FaTachometerAlt size={20} />
                            <span>Dashboard</span>
                        </div>
                    </Link>

                    <Link href="/manajemen">
                        <div className="flex items-center gap-2 border-b border-white pb-2 mt-2 text-white">
                            <FaBook size={20} />
                            <span>Manajemen Produk</span>
                        </div>
                    </Link>

                    <Link href="/pesanan">
                        <div className="flex items-center gap-2 border-b border-white pb-2 mt-2 text-white">
                            <FaCartArrowDown size={20} />
                            <span>Pesanan</span>
                        </div>
                    </Link>

                    {/* <Link href="/pelanggan">
                        <div className="flex items-center gap-2 border-b border-white pb-2 mt-2 text-white">
                            <BsFillPeopleFill size={20} />
                            <span>Pelanggan</span>
                        </div>
                    </Link> */}



                </div>
            </div>
        </>
    );
}

