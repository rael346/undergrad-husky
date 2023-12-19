import { Course, Plan } from "@/components/Plan";
import { usePlanStore } from "@/stores/planStore";
import {
  DndContext,
  DragOverlay,
  DragStartEvent,
  closestCorners,
} from "@dnd-kit/core";

function App() {
  const [activeCourse, setActiveCourse] = usePlanStore(
    ({ activeCourse, setActiveCourse }) => [activeCourse, setActiveCourse],
  );

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveCourse(active.id as string);
  };

  const handleDragOver = () => {};

  const handleDragEnd = () => {
    setActiveCourse(null);
  };

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Plan />
      <DragOverlay>
        {activeCourse && <Course course={activeCourse} />}
      </DragOverlay>
    </DndContext>
  );
}

export default App;
