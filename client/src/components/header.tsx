import * as React from "react";
import { Avatar } from "react-lorem-ipsum";

export default function Header() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header>
      <span className="date">{formattedDate}</span>
      <h1>Trends ↗</h1>
      <div className="avatar">
        <Avatar />
      </div>
    </header>
  );
};
