import { useState } from "react";

type Props = {
  items: readonly string[];
  onChange: (items: readonly string[]) => void;
};

export const SortBox: React.FC<Props> = ({ items, onChange }) => {
  return (
    <>
      {items.map((item) => (
        <div key={item}>{item}</div>
      ))}
    </>
  );
};
