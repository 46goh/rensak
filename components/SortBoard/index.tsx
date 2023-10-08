import styled from "@emotion/styled";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  useDroppable,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useCallback, useState } from "react";
import { DraggableItem, DraggingItem } from "./DraggableItem";
import { Item } from "@/types/Item";
import { FormLabel } from "@chakra-ui/react";

type Props = {
  items: Item[];
  onChange: (items: Item[]) => void;
};

export const SortBoard: React.FC<Props> = ({ items, onChange }) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const { setNodeRef } = useDroppable({ id: "droppable", data: items });

  const [activeItem, setActiveItem] = useState<Item | null>(null);

  const handleDragStart = useCallback(
    (e: DragStartEvent) => {
      const targetItem = items.find((item) => item.id === e.active.id);
      if (targetItem != null) {
        setActiveItem(targetItem);
      }
    },
    [items],
  );

  const handleDragEnd = useCallback(
    (e: DragEndEvent) => {
      setActiveItem(null);
      const { active, over } = e;

      if (over != null) {
        const overIndex = items.findIndex((item) => item.id === over.id);
        const activeIndex = items.findIndex((item) => item.id === active.id);
        if (activeIndex !== overIndex) {
          onChange(arrayMove(items, activeIndex, overIndex));
        }
      }
    },
    [items, onChange],
  );

  const handleDragCancel = useCallback(() => {
    setActiveItem(null);
  }, []);

  return (
    <Wrapper>
      <FormLabel>ドラッグ&ドロップで並び替え</FormLabel>
      <SortBoardWrapper>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <ScrollableWrapper ref={setNodeRef}>
            <SortableContext
              items={items}
              strategy={horizontalListSortingStrategy}
            >
              {items.map((item) => (
                <DraggableItem key={item.id} {...item} />
              ))}
            </SortableContext>
          </ScrollableWrapper>
          <DragOverlay>
            {activeItem ? <DraggingItem {...activeItem} /> : null}
          </DragOverlay>
        </DndContext>
      </SortBoardWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

const SortBoardWrapper = styled.div`
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
