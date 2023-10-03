import { useState } from "react";
import styled from '@emotion/styled';
import { TextArea } from "../TextArea";

export const Rensak: React.FC<{}> = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  return (
    <Wrapper>
      <TextArea value={input} onChange={setInput} />
      <TextArea value={output} onChange={setOutput} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;