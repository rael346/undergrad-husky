import { Plan } from "@/components/Plan";
import { DndContext, closestCorners } from "@dnd-kit/core";

function App() {
  const handleDragStart = () => {};

  const handleDragOver = () => {};

  const handleDragEnd = () => {};

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Plan />
    </DndContext>
  );
}

export default App;
