import { Course, Plan } from "@/components/Plan";
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

  const moveCourse = usePlanStore(state => state.moveCourse);

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveCourse(active.id as string);
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    console.log("DragOver", active.id, over?.id);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    moveCourse(active.id as string, over?.id as string | undefined);
    setActiveCourse(null);
  };

  return (
    <div>
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
    </div>
  );
}

export default App;
