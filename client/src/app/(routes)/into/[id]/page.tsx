'use client';
import { useParams } from "next/navigation";
import { CardList } from "@/components/cardlist";

export default function CardPage() {
  const { id } = useParams();
  const selectedId = Array.isArray(id) ? id[0] : id; // Ensure id is a string

  return <CardList selectedId={selectedId} />;
};
