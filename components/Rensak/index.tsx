"use client";

import { useCallback, useMemo, useState } from "react";
import styled from "@emotion/styled";
import { TextAreaForm } from "../TextAreaForm";
import { Button, useToast } from "@chakra-ui/react";
import { ArrowDownIcon, CopyIcon } from "@chakra-ui/icons";
import { SortBoard } from "../SortBoard";
import { v4 as uuidv4 } from "uuid";
import { Item } from "@/types/Item";

export const Rensak: React.FC<{}> = () => {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([] as Item[]);
  const toast = useToast();

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

  const onClickCopy = useCallback(async () => {
    await navigator.clipboard.writeText(output);
    toast({
      title: "クリップボードにコピーしました",
      status: "success",
      position: "bottom-right",
      duration: 5000,
      isClosable: true,
    });
  }, [output, toast]);

  return (
    <Wrapper>
      <TextAreaWrapper>
        <TextAreaForm
          label="↓ここに連作を貼り付け"
          value={input}
          onChange={setInput}
        />
      </TextAreaWrapper>
      <Button
        colorScheme="teal"
        leftIcon={<ArrowDownIcon />}
        onClick={onClickConvert}
      >
        並び替える
      </Button>

      <SortBoard items={items} onChange={setItems} />

      <TextAreaWrapper>
        <TextAreaForm label="出力結果" readOnly value={output} />
      </TextAreaWrapper>

      <Button
        colorScheme="teal"
        leftIcon={<CopyIcon />}
        onClick={onClickCopy}
        disabled={!canOutput}
      >
        出力結果をコピー
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 8px 0 32px;
`;

const TextAreaWrapper = styled.div`
  max-width: 600px;
  min-width: 300px;
  margin: 8px;
`;
