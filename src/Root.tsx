import { Course } from "@/components/Course";
import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { usePlanStore } from "@/stores/planStore";
import { DndData } from "@/types";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  closestCorners,
} from "@dnd-kit/core";
import { Outlet } from "@tanstack/react-router";

export function Root() {
  const setActive = usePlanStore(state => state.setActive);
  const moveCourse = usePlanStore(state => state.moveCourse);

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActive(active.data.current as DndData);
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    const activeData = active.data.current as DndData | undefined;
    const overData = over?.data.current as DndData | undefined;

    if (
      !over ||
      !activeData ||
      !overData ||
      activeData.type !== "course" ||
      (overData.type !== "course" && overData.type !== "term")
    ) {
      return;
    }

    if (overData.type === "term") {
      moveCourse(activeData.location, {
        ...overData.location,
        courseIndex: 1,
      });
    }

    if (overData.type === "course") {
      const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height;

      const modifier = isBelowOverItem ? 1 : 0;
      const newCourseIndex = overData.location.courseIndex + modifier;

      moveCourse(activeData.location, {
        ...overData.location,
        courseIndex: newCourseIndex,
      });
    }
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    const activeData = active.data.current as DndData | undefined;
    const overData = over?.data.current as DndData | undefined;

    if (
      !activeData ||
      !overData ||
      activeData.type !== "course" ||
      overData.type !== "course" ||
      // courses in different year/term
      // This case is handled by handleDragOver
      activeData.location.yearIndex !== overData.location.yearIndex ||
      activeData.location.termIndex !== overData.location.termIndex ||
      // active course didn't change position
      activeData.location.courseIndex === overData.location.courseIndex
    ) {
      return;
    }

    moveCourse(activeData.location, overData.location);
    setActive(null);
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <DndContext
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-col space-y-8">
          <Header />
          <Outlet />
        </div>
        <Overlay />
      </DndContext>
    </ThemeProvider>
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
