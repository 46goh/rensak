import React, { useCallback } from "react";
import { Textarea } from "@chakra-ui/react";

type Props = {
  value: string;
  readOnly?: boolean;
  onChange: (value: string) => void;
};

export const TextArea: React.FC<Props> = ({ value, readOnly, onChange }) => {
  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );
  return (
    <Textarea
      rows={5}
      fontSize={14}
      value={value}
      readOnly={readOnly}
      onChange={handleOnChange}
    />
  );
};
