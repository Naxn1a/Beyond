'use client'
import React from "react";
import { AnimatePresence } from "framer-motion";
import Header from "@/components/header";
import { Item } from "@/components/item";
import { List } from "@/components/list";
import { useParams } from "next/navigation";

function Store() {
  const { id } = useParams();
  const imageHasLoaded = true;

  return (
    <>
      <List selectedId={id} />
      <AnimatePresence>
        {id && imageHasLoaded && <Item id={id} key="item" />}
      </AnimatePresence>
    </>
  );
}

export default function Into() {
  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className="max-w-screen-xl w-full p-12">
        <Header />
        <Store />
      </div>
    </div>
  );
}

