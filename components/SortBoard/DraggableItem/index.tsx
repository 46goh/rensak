import { Item } from "@/types/Item";
import { ArrowLeftIcon, DownloadIcon, DragHandleIcon } from "@chakra-ui/icons";
import { IconButton, Tag } from "@chakra-ui/react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styled from "@emotion/styled";
import { forwardRef, useCallback } from "react";

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
        <DragIcon color="gray.400" />
      </DragHandler>
      <Tag color="teal">{index + 1}</Tag>
      <VerticalText>{content}</VerticalText>
      <IconButton
        size="xs"
        aria-label="末尾に送る"
        icon={<DownloadIcon style={{ rotate: "90deg" }} />}
        color="teal"
        onClick={handleClickGoToLastButton}
      />
    </VerticalCard>
  );
};

type DraggingItemProps = Item;

export const DraggingItem = forwardRef<HTMLDivElement, DraggingItemProps>(
  ({ content }, ref) => {
    return (
      <VerticalCard ref={ref}>
        <DragHandler>
          <DragIcon color="gray.400" />
        </DragHandler>
        <Tag color="teal">-</Tag>
        <VerticalText>{content}</VerticalText>
        <IconButton
          size="xs"
          aria-label="末尾に送る"
          icon={<DownloadIcon style={{ rotate: "90deg" }} />}
          color="gray"
          disabled
        />
      </VerticalCard>
    );
  },
);
DraggingItem.displayName = "DraggingItem";

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

const DragHandler = styled.div`
  touch-action: none;
  padding: 8px;
`;

const DragIcon = styled(DragHandleIcon)`
  rotate: 90deg;
`;

const VerticalText = styled.span`
  padding: 4px 4px 8px;
  writing-mode: vertical-rl;
  overflow-wrap: anywhere;
  height: 480px;
`;
