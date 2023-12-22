import { DraggableDots } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Course, DndCourse } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableCourse({ course }: { course: DndCourse }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: course.dndId,
    data: {
      type: "course",
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
        "w-full px-2 py-1 rounded-md border border-solid shadow-sm",
        "flex flex-row justify-start items-center space-x-2",
        "bg-white hover:scale-105 transition-transform",
        isDragging && "opacity-50 scale-105",
        isOverlay && "shadow-lg",
      )}
    >
      <DraggableDots />
      <div className="flex flex-col justify-start">
        <div className="text-xs text-slate-600">
          {course.subject + course.courseId}
        </div>
        <div className="text-wrap">{course.name}</div>
      </div>
    </div>
  );
}

export { Course, SortableCourse };
