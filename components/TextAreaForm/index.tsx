import React, { useCallback } from "react";
import { Field, Textarea } from "@chakra-ui/react";

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
    <Field.Root>
      <Field.Label>{label}</Field.Label>
      <Textarea
        rows={5}
        fontSize={14}
        value={value}
        readOnly={readOnly}
        bgColor={readOnly ? "gray.100" : "white"}
        onChange={handleOnChange}
      />
    </Field.Root>
  );
};
