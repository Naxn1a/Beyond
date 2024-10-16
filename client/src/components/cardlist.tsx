import * as React from "react";
import { Card } from "@/components/palette/index";
import { CardData } from "@/types/type";
import { useRouter, useSearchParams } from "next/navigation";

const List = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  return (
    <ul className="card-list">
      {cardData.map((card) => (
        <Card
          key={card.id}
          isSelected={id === card.id}
          onClick={() => router.push(`/${card.id}`)}
          {...card}
        />
      ))}
    </ul>
  );
};

export const CardList = () => <List />;

const cardData: CardData[] = [
  {
    id: "a",
    category: "Technologies",
    title: "5 Food Apps Delivering the Best of Your City",
    pointOfInterest: 80,
    backgroundColor: "#814A0E",
  },
  {
    id: "b",
    category: "How to",
    title: "Arrange Your Apple Devices for the Gram",
    pointOfInterest: 120,
    backgroundColor: "#959684",
  },
  {
    id: "c",
    category: "Pedal Power",
    title: "Map Apps for the Superior Mode of Transport",
    pointOfInterest: 260,
    backgroundColor: "#5DBCD2",
  },
  {
    id: "d",
    category: "Holidays",
    title: "Our Pick of Apps to Help You Escape From Apps",
    pointOfInterest: 200,
    backgroundColor: "#8F986D",
  },
  {
    id: "e",
    category: "Photography",
    title: "The Latest Ultra-Specific Photography Editing Apps",
    pointOfInterest: 150,
    backgroundColor: "#FA6779",
  },
  {
    id: "f",
    category: "They're all the same",
    title: "100 Cupcake Apps for the Cupcake Connoisseur",
    pointOfInterest: 60,
    backgroundColor: "#282F49",
  },
  {
    id: "g",
    category: "Cats",
    title: "Yes, They Are Sociopaths",
    pointOfInterest: 200,
    backgroundColor: "#AC7441",
  },
  {
    id: "h",
    category: "Holidays",
    title: "Seriously the Only Escape is the Stratosphere",
    pointOfInterest: 260,
    backgroundColor: "#CC555B",
  },
];
