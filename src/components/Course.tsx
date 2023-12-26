import { cn } from "@/lib/utils";
import { usePlanStore } from "@/stores/planStore";
import { Course } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useShallow } from "zustand/react/shallow";
import { GripVerticalIcon } from "lucide-react";

function SortableCourse({
  dndId,
  yearIndex,
  termIndex,
  courseIndex,
}: {
  dndId: string;
  yearIndex: number;
  termIndex: number;
  courseIndex: number;
}) {
  const course = usePlanStore(
    useShallow(
      state => state.schedule[yearIndex].terms[termIndex].courses[courseIndex],
    ),
  );
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: dndId,
    data: {
      type: "course",
      dndId: course.dndId,
      location: {
        yearIndex,
        termIndex,
        courseIndex,
      },
    },
  });

  // https://github.com/clauderic/dnd-kit/issues/926
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Course course={course} isDragging={isDragging} />
    </div>
  );
}

function Course({
  course,
  isOverlay = false,
  isDragging = false,
}: {
  course: Course;
  isOverlay?: boolean;
  isDragging?: boolean;
}) {
  return (
    <div
      className={cn(
        "w-full px-2 py-1 rounded-lg",
        "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        "flex flex-row justify-start items-center space-x-2",
        "hover:scale-105 transition-transform cursor-pointer",
        isDragging && "opacity-50",
        isOverlay && "shadow-lg scale-105",
      )}
    >
      <GripVerticalIcon className="w-4 h-4" />
      <div className="flex flex-col justify-start">
        <div className="text-xs">{course.subject + " " + course.courseId}</div>
        <div className="text-wrap text-sm">{course.name}</div>
      </div>
    </div>
  );
}

export { Course, SortableCourse };
