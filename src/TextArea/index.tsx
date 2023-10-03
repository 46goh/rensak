import React, { useCallback } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
}

export const TextArea: React.FC<Props> = ({value, onChange}) => {
  const handleOnChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  }, [onChange])
  return (
    <textarea value={value} onChange={handleOnChange} />
  )
}