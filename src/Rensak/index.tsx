"use client";

import { useCallback, useMemo, useState } from "react";
import styled from "@emotion/styled";
import { TextArea } from "../TextArea";
import { Button } from "@chakra-ui/react";
import { ArrowDownIcon, CopyIcon } from "@chakra-ui/icons";
import { SortBox } from "../SortBox";

export const Rensak: React.FC<{}> = () => {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([] as readonly string[]);
  const [output, setOutput] = useState("");

  const onClickConvert = useCallback(() => {
    setItems(input.split(/\n/).filter((item) => !!item));
  }, [input]);

  const canOutput = useMemo(() => items.length > 0, [items.length]);

  const onClickOutput = useCallback(() => {
    setOutput(items.join("\n"));
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

      <SortBox items={items} onChange={setItems} />

      <Button colorScheme="teal" leftIcon={<CopyIcon />} onClick={onClickCopy}>
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
