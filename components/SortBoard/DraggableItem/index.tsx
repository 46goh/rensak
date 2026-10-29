import { Item } from "@/types/Item";
import { IconButton, Tag } from "@chakra-ui/react";
import { LuDownload, LuGripVertical } from "react-icons/lu";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styled from "@emotion/styled";
import { useCallback } from "react";

type DraggableItemProps = Item & {
  index: number;
  onGoToLast: (index: number) => void;
};

export const DraggableItem: React.FC<DraggableItemProps> = ({
  id,
  content,
  index,
  onGoToLast,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    setActivatorNodeRef,
  } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
  };

  const handleClickGoToLastButton = useCallback(() => {
    onGoToLast(index);
  }, [index, onGoToLast]);

  return (
    <VerticalCard ref={setNodeRef} style={style} isDragging={isDragging}>
      <DragHandler ref={setActivatorNodeRef} {...attributes} {...listeners}>
        <DragIcon />
      </DragHandler>
      <Tag.Root color="teal.solid">
        <Tag.Label>{index + 1}</Tag.Label>
      </Tag.Root>
      <VerticalText>{content}</VerticalText>
      <IconButton
        size="xs"
        aria-label="末尾に送る"
        variant="subtle"
        color="teal.solid"
        onClick={handleClickGoToLastButton}
      >
        <LuDownload style={{ rotate: "90deg" }} />
      </IconButton>
    </VerticalCard>
  );
};

type DraggingItemProps = Item & { ref?: React.Ref<HTMLDivElement> };

export const DraggingItem: React.FC<DraggingItemProps> = ({ content, ref }) => {
  return (
    <VerticalCard ref={ref}>
      <DragHandler isDragging>
        <DragIcon />
      </DragHandler>
      <Tag.Root color="teal.solid">
        <Tag.Label>-</Tag.Label>
      </Tag.Root>
      <VerticalText>{content}</VerticalText>
      <IconButton
        size="xs"
        aria-label="末尾に送る"
        variant="subtle"
        color="gray.600"
        disabled
      >
        <LuDownload style={{ rotate: "90deg" }} />
      </IconButton>
    </VerticalCard>
  );
};

const VerticalCard = styled.div<{ isDragging?: boolean }>`
  ${({ isDragging }) =>
    isDragging
      ? `
        background-color: #31979522;
        border: 1px solid #e0e0e022;
        color: #555555;
      `
      : `
        background-color: #FFFFFF;
        border: 1px solid #E0E0E0;
      `}

  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  min-width: 54px;
  padding-bottom: 8px;
`;

const DragHandler = styled.div<{ isDragging?: boolean }>`
  ${({ isDragging }) =>
    isDragging
      ? `
        cursor: grabbing;
      `
      : `
        cursor: grab;
      `}
  touch-action: none;
  padding: 8px;
`;

const DragIcon = styled(LuGripVertical)`
  rotate: 90deg;
  color: #a0aec0;
`;

const VerticalText = styled.span`
  padding: 4px 4px 8px;
  writing-mode: vertical-rl;
  overflow-wrap: anywhere;
  height: 490px;
`;
