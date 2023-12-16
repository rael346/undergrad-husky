import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  closestCorners,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";

function Item({ id }) {
  return (
    <Button className={`w-32 shadow-lg bg-white`} variant="outline">
      {id}
    </Button>
  );
}

function SortableItem({ id }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  // https://github.com/clauderic/dnd-kit/issues/926
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Item id={id} />
    </div>
  );
}

type ContainerProps = {
  children: React.ReactNode;
  id: UniqueIdentifier;
  items: UniqueIdentifier[];
};

function DroppableContainer({ children, id, items }: ContainerProps) {
  const { setNodeRef } = useDroppable({
    id,
    data: {
      type: "container",
      children: items,
    },
  });

  return (
    <div ref={setNodeRef} className="h-60">
      {children}
    </div>
  );
}

function App() {
  const [containers, setContainers] = useState<{ [key: string]: number[] }>({
    container1: [1, 2, 3],
    container2: [4, 5, 6],
    container3: [7, 8, 9],
    container4: [10, 11, 12],
  });
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const findContainer = (id: UniqueIdentifier | undefined) => {
    if (!id) {
      return;
    }

    if (id in containers) {
      return id;
    }

    return Object.keys(containers).find(key =>
      containers[key].includes(id as number),
    );
  };

  function handleDragStart({ active }: DragStartEvent) {
    setActiveId(active.id);
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(over?.id);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = containers[activeContainer!].indexOf(
      active.id as number,
    );
    const overIndex = containers[overContainer!].indexOf(over?.id as number);

    if (activeIndex !== overIndex) {
      setContainers(prev => ({
        ...prev,
        [overContainer]: arrayMove(prev[overContainer], activeIndex, overIndex),
      }));
    }

    setActiveId(null);
  }

  function handleDragOver({ active, over }: DragOverEvent) {
    const overContainer = findContainer(over?.id);
    const activeContainer = findContainer(active.id);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setContainers(prev => {
      const overItems = prev[overContainer];
      const activeIndex = prev[activeContainer].indexOf(active.id as number);
      const overIndex = overItems.indexOf(over?.id as number);

      let newIndex: number;

      if ((over?.id as number) in prev) {
        newIndex = overItems.length + 1;
      } else {
        const isBelowOverItem =
          over &&
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height;

        const modifier = isBelowOverItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return {
        ...prev,
        [activeContainer]: prev[activeContainer].filter(
          item => item !== active.id,
        ),
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          prev[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length),
        ],
      };
    });
  }
  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-row space-x-4 w-lg p-2 bg-primary-foreground">
          {Object.keys(containers).map(containerId => (
            <DroppableContainer
              key={containerId}
              id={containerId}
              items={containers[containerId]}
            >
              <SortableContext
                key={containerId}
                items={containers[containerId]}
                strategy={verticalListSortingStrategy}
              >
                <div className="flex flex-col space-y-1 w-40 ">
                  <div className="text-primary font-bold">{containerId}</div>
                  <div className="flex flex-col max-w-xs space-y-2">
                    {containers[containerId].map(id => (
                      <SortableItem key={id} id={id} />
                    ))}
                  </div>
                </div>
              </SortableContext>
            </DroppableContainer>
          ))}
        </div>
        <DragOverlay>{activeId && <Item id={activeId} />}</DragOverlay>
      </DndContext>
    </>
  );
}

export default App;
