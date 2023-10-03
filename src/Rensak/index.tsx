"use client";

import { useState } from "react";
import styled from "@emotion/styled";
import { TextArea } from "../TextArea";

export const Rensak: React.FC<{}> = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  return (
    <Wrapper>
      <TextAreaWrapper>
        <TextArea value={input} onChange={setInput} />
      </TextAreaWrapper>
      <TextAreaWrapper>
        <TextArea value={output} onChange={setOutput} />
      </TextAreaWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const TextAreaWrapper = styled.div`
  max-width: 600px;
  min-width: 300px;
  margin: 8px;
`;
