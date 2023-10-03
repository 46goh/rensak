import styled from "@emotion/styled";
import { DragHandleIcon } from "@chakra-ui/icons";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  UniqueIdentifier,
  useDraggable,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useCallback, useState } from "react";

type Props = {
  items: readonly string[];
  onChange: (items: readonly string[]) => void;
};

export const SortBox: React.FC<Props> = ({ items, onChange }) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const handleDragStart = useCallback((e: DragEndEvent) => {
    setActiveId(e.active.id);
  }, []);

  const handleDragEnd = useCallback(() => {
    setActiveId(null);
  }, []);

  return (
    <SortBoxWrapper>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <ScrollableWrapper>
          {items.map((item) => (
            <Draggable key={item} id={item}>
              {item}
            </Draggable>
          ))}
        </ScrollableWrapper>
        <DragOverlay>
          {activeId ? <SortableItem>{`${activeId}`}</SortableItem> : null}
        </DragOverlay>
      </DndContext>
    </SortBoxWrapper>
  );
};

const SortBoxWrapper = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  height: 600px;
  width: calc(100vw - 16px);
  margin: auto;
  padding: 16px;
`;

const ScrollableWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  overflow-x: scroll;
  padding: 0 16px;
  gap: 16px;
  height: 100%;
`;

const Draggable: React.FC<{
  id: UniqueIdentifier;
  children: React.ReactNode;
}> = ({ id, children }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });
  return (
    <VerticalCard ref={setNodeRef}>
      <DragHandler {...listeners} {...attributes}>
        <DragIcon color="gray.400" />
      </DragHandler>
      <VerticalText>{children}</VerticalText>
    </VerticalCard>
  );
};

const SortableItem: React.FC<{ children: string }> = ({ children }) => {
  return (
    <VerticalCard>
      <DragHandler>
        <DragIcon color="gray.400" />
      </DragHandler>
      <VerticalText>{children}</VerticalText>
    </VerticalCard>
  );
};

const VerticalCard = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 54px;
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
