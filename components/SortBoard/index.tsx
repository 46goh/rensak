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
import { FormLabel, Tag } from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";

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

  const handleGoToLast = useCallback(
    (index: number) => {
      onChange(arrayMove(items, index, items.length - 1));
    },
    [items, onChange],
  );

  return (
    <Wrapper>
      <LabelWrapper>
        <FormLabel>
          ドラッグ&ドロップで並び替え（
          <Tag color="teal" size="sm" verticalAlign="baseline">
            <DownloadIcon style={{ rotate: "90deg" }} color="teal" />
          </Tag>
          ボタンで末尾に送る）
        </FormLabel>
        <Tag color="teal">{items.length}</Tag>
      </LabelWrapper>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortBoardWrapper>
          <ScrollableWrapper ref={setNodeRef}>
            <SortableContext
              items={items}
              strategy={horizontalListSortingStrategy}
            >
              {items.map((item, index) => (
                <DraggableItem
                  key={item.id}
                  {...item}
                  index={index}
                  onGoToLast={handleGoToLast}
                />
              ))}
            </SortableContext>
          </ScrollableWrapper>
          <DragOverlay>
            {activeItem ? <DraggingItem {...activeItem} /> : null}
          </DragOverlay>
        </SortBoardWrapper>
      </DndContext>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 4px;
`;

const LabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SortBoardWrapper = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  width: calc(100vw - 16px);
  margin: auto;
  padding: 16px 0;
  height: 600px;
`;

const ScrollableWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  overflow-x: scroll;
  padding: 0 16px;
  gap: 16px;
  height: 100%;
`;
