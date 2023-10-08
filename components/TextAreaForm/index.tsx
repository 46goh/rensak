import React, { useCallback } from "react";
import { FormLabel, Textarea } from "@chakra-ui/react";
import styled from "@emotion/styled";

type Props = {
  label: string;
  value: string;
  readOnly?: boolean;
  onChange?: (value: string) => void;
};

export const TextAreaForm: React.FC<Props> = ({
  label,
  value,
  readOnly,
  onChange,
}) => {
  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(e.target.value);
    },
    [onChange],
  );
  return (
    <Wrapper>
      <FormLabel>{label}</FormLabel>
      <Textarea
        rows={5}
        fontSize={14}
        value={value}
        readOnly={readOnly}
        bgColor={readOnly ? "gray.100" : "white"}
        onChange={handleOnChange}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
`;
