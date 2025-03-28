"use client";
import { useState, useEffect } from "react";
import React from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "@/app/_data/Lookup";
import { useSearchParams } from "next/navigation";

function LogoTitle({ onHandleInputChange }) {
  const searchParam = useSearchParams();
  const [title, setTitle] = useState("");

  // Update title when searchParam changes
  useEffect(() => {
    const paramTitle = searchParam?.get("title") ?? "";
    setTitle(paramTitle);
  }, [searchParam]);

  return (
    <div className="my-10">
      <HeadingDescription
        title={Lookup?.LogoTitle}
        description={Lookup.LogoTitleDesc}
      />
      <input
        type="text"
        placeholder={Lookup.InputTitlePlaceholder}
        className="p-4 border rounded-lg mt-5 w-full"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          onHandleInputChange(e.target.value);
        }}
      />
    </div>
  );
}

export default LogoTitle;
