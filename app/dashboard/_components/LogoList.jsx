"use client";
import { UserDetailContex } from "@/app/_context/UserDetailContext";
import { db } from "@/configs/FirebaseConfig";
import { collection, doc, getDocs } from "firebase/firestore";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";

function LogoList() {
  const { userDetail, setUserDetail } = useContext(UserDetailContex);
  const [logoList, setLogoList] = useState([]);
  useEffect(() => {
    userDetail && GetUserLogos();
  }, [userDetail]);
  const GetUserLogos = async () => {
    const querySnapshot = await getDocs(
      collection(db, "users", userDetail?.email, "logos")
    );
    setLogoList([]);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setLogoList((prev) => [...prev, doc.data()]);
    });
  };
  const ViewLogo=(image)=>{

  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10">
      {logoList?.length > 0
        ? logoList.map((logo, index) => <div key={index} className="hover:scale-105 transition-all cursor "onClick={()=>ViewLogo(logo?.image)}>
          <Image src={logo?.image} width={400} height={200} className="w-full rounded-xl" alt={logo?.title}/>
          <h2 className="text-center text-lg font-medium mt-2">{logo?.title}</h2>
          <p className="text-sm text-gray-500 text-center">{logo.description}</p>
        </div>)
        : [1, 2, 3, 4, 5, 6].map((item, index) =>(<div key={index} className="bg-slate-200 animate-pulse rounded-xl w-full h-[200px] "></div>))}
    </div>
  );
}

export default LogoList;
