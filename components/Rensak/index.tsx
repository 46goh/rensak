"use client";

import { useCallback, useMemo, useState } from "react";
import styled from "@emotion/styled";
import { TextArea } from "../TextArea";
import { Button } from "@chakra-ui/react";
import { ArrowDownIcon, CopyIcon } from "@chakra-ui/icons";
import { SortBoard } from "../SortBoard";
import { v4 as uuidv4 } from "uuid";
import { Item } from "@/types/Item";

export const Rensak: React.FC<{}> = () => {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([] as Item[]);

  const onClickConvert = useCallback(() => {
    setItems(
      input
        .split(/\n/)
        .filter((line) => !!line)
        .map((line) => ({
          id: uuidv4(),
          content: line,
        })),
    );
  }, [input]);

  const canOutput = useMemo(() => items.length > 0, [items.length]);
  const output = useMemo(() => {
    return items.map((item) => item.content).join("\n");
  }, [items]);

  const onClickCopy = useCallback(() => {
    navigator.clipboard.writeText(output);
  }, [output]);

  return (
    <Wrapper>
      <TextAreaWrapper>
        <TextArea value={input} onChange={setInput} />
      </TextAreaWrapper>
      <Button
        colorScheme="teal"
        leftIcon={<ArrowDownIcon />}
        onClick={onClickConvert}
      >
        変換
      </Button>

      <SortBoard items={items} onChange={setItems} />

      <TextAreaWrapper>
        <TextArea readOnly value={output} />
      </TextAreaWrapper>

      <Button
        colorScheme="teal"
        leftIcon={<CopyIcon />}
        onClick={onClickCopy}
        disabled={!canOutput}
      >
        コピー
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const TextAreaWrapper = styled.div`
  max-width: 600px;
  min-width: 300px;
  margin: 8px;
`;
