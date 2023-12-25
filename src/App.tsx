import { Course } from "@/components/Course";
import { Plan } from "@/components/Plan";
import { usePlanStore } from "@/stores/planStore";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  closestCorners,
} from "@dnd-kit/core";

function App() {
  const setActiveCourse = usePlanStore(state => state.setActiveCourse);

  const moveCourseToSameTerm = usePlanStore(
    state => state.moveCourseToSameTerm,
  );

  const moveCourseToDifferentTerm = usePlanStore(
    state => state.moveCourseToDifferentTerm,
  );

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveCourse(active.id as string);
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
      <Overlay />
    </DndContext>
  );
}

function Overlay() {
  const activeCourse = usePlanStore(state => state.activeCourse);

  return (
    <DragOverlay>
      {activeCourse && <Course course={activeCourse} isOverlay />}
    </DragOverlay>
  );
}

export default App;
