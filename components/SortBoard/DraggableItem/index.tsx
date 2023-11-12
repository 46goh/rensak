import { Item } from "@/types/Item";
import { DragHandleIcon } from "@chakra-ui/icons";
import { Tag } from "@chakra-ui/react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styled from "@emotion/styled";
import { forwardRef } from "react";

type DraggableItemProps = Item & { index: number };

export const DraggableItem: React.FC<DraggableItemProps> = ({
  id,
  content,
  index,
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
  return (
    <VerticalCard ref={setNodeRef} style={style} isDragging={isDragging}>
      <DragHandler ref={setActivatorNodeRef} {...attributes} {...listeners}>
        <DragIcon color="gray.400" />
      </DragHandler>
      <Tag color="teal">{index + 1}</Tag>
      <VerticalText>{content}</VerticalText>
    </VerticalCard>
  );
};

type DraggingItemProps = Item;

export const DraggingItem = forwardRef<HTMLDivElement, DraggingItemProps>(
  ({ content }, ref) => {
    return (
      <VerticalCardWithHeight ref={ref}>
        <DragHandler>
          <DragIcon color="gray.400" />
        </DragHandler>
        <VerticalText>{content}</VerticalText>
      </VerticalCardWithHeight>
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
  min-width: 54px;
`;

const VerticalCardWithHeight = styled(VerticalCard)`
  height: 568px;
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
`;
