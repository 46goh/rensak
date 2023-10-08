import { Item } from "@/types/Item";
import { DragHandleIcon } from "@chakra-ui/icons";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styled from "@emotion/styled";

type Props = Item;

export const DraggableItem: React.FC<Props> = ({ id, content }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
  };
  return (
    <VerticalCard ref={setNodeRef} style={style} isDragging={isDragging}>
      <DragHandler {...attributes} {...listeners}>
        <DragIcon color="gray.400" />
      </DragHandler>
      <VerticalText>{content}</VerticalText>
    </VerticalCard>
  );
};

export const DraggingItem: React.FC<Props> = ({ content }) => {
  return (
    <VerticalCardWithHeight>
      <DragHandler>
        <DragIcon color="gray.400" />
      </DragHandler>
      <VerticalText>{content}</VerticalText>
    </VerticalCardWithHeight>
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
  min-width: 54px;
`;

const VerticalCardWithHeight = styled(VerticalCard)`
  height: 568px;
`;

const DragHandler = styled.div`
  padding: 8px;
`;

const DragIcon = styled(DragHandleIcon)`
  rotate: 90deg;
`;

const VerticalText = styled.span`
  padding: 4px 4px 8px;
  writing-mode: vertical-rl;
  text-orientation: upright;
  overflow-wrap: anywhere;
`;
