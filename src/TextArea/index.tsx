import React, { useCallback } from "react";
import { Textarea } from "@chakra-ui/react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const TextArea: React.FC<Props> = ({ value, onChange }) => {
  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );
  return <Textarea value={value} onChange={handleOnChange} />;
};
