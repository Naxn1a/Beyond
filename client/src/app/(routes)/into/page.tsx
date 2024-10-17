'use client'
import React from 'react'
import Header from "@/components/header";
import { CardList } from "@/components/cardlist";

export default function Into() {

  return (
    <div className="container">
      <Header />
      <CardList selectedId={undefined} />
    </div>
  )
}
