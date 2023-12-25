import { Course } from "@/components/Course";
import { Plan } from "@/components/Plan";
import { DndData, usePlanStore } from "@/stores/planStore";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  closestCorners,
} from "@dnd-kit/core";

function App() {
  const setActive = usePlanStore(state => state.setActive);

  const moveCourseToSameTerm = usePlanStore(
    state => state.moveCourseToSameTerm,
  );

  const moveCourseToDifferentTerm = usePlanStore(
    state => state.moveCourseToDifferentTerm,
  );

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActive(active.data.current as DndData);
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    if (!over) {
      return;
    }

    moveCourseToDifferentTerm(active, over);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over) {
      return;
    }

    moveCourseToSameTerm(active, over);
    setActive(null);
  };

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Plan />
      <Overlay />
    </DndContext>
  );
}

function Overlay() {
  const activeCourse = usePlanStore(state => state.active);

  return (
    <DragOverlay>
      {activeCourse && <Course course={activeCourse} isOverlay />}
    </DragOverlay>
  );
}

export default App;
