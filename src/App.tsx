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
  const [activeCourse, setActiveCourse] = usePlanStore(
    ({ activeCourse, setActiveCourse }) => [activeCourse, setActiveCourse],
  );

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
    moveCourseToSameTerm(active.id as string, over?.id as string);
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
        {activeCourse && <Course course={activeCourse} isOverlay />}
      </DragOverlay>
    </DndContext>
  );
}

export default App;
