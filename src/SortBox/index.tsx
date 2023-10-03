import styled from "@emotion/styled";
import { useState } from "react";

type Props = {
  items: readonly string[];
  onChange: (items: readonly string[]) => void;
};

export const SortBox: React.FC<Props> = ({ items, onChange }) => {
  return (
    <SortBoxWrapper>
      {items.map((item) => (
        <SortableItem key={item}>{item}</SortableItem>
      ))}
    </SortBoxWrapper>
  );
};

const SortBoxWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  height: 400px;
  gap: 16px;
`;

const SortableItem: React.FC<{ children: string }> = ({ children }) => {
  return <Vertical>{children}</Vertical>;
};

const Vertical = styled.div`
  writing-mode: vertical-rl;
`;
