'use client'
import React from 'react'
import Header from "@/components/header";
import { CardList } from "@/components/cardlist";

export default function Into() {

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-screen-xl p-12">
        <Header />
        <CardList selectedId={undefined} />
      </div>
    </div>
  )
}
