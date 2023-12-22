import { DraggableDots } from "@/components/icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { usePlanStore } from "@/stores/planStore";
import {
  Course,
  DndCourse,
  DndTerm,
  DISPLAY_SEASON,
  TermSeason,
} from "@/types";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Plan() {
  const schedule = usePlanStore(state => state.schedule);

  return (
    <Accordion type="multiple" className="flex flex-col justify-center">
      {schedule.map((year, yearIndex) => (
        <AccordionItem
          value={`year-${yearIndex + 1}`}
          key={`year-${yearIndex + 1}`}
        >
          <AccordionTrigger className="px-2 py-4 font-bold text-base">{`Year ${
            yearIndex + 1
          }`}</AccordionTrigger>

          <AccordionContent className="grid grid-cols-4 gap-x-2 bg-slate-100">
            {year.map(term => (
              <Term term={term} key={term.dndId} />
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function Term({
  term,
}: {
  term: DndTerm<
    | TermSeason.FALL
    | TermSeason.SPRING
    | TermSeason.SUMMER_1
    | TermSeason.SUMMER_2
    | TermSeason.SUMMER_FULL
  >;
}) {
  return (
    <DroppableContainer id={term.dndId}>
      <div className="px-2 py-2 flex flex-col space-y-2 min-h-52">
        <div className="font-semibold">{DISPLAY_SEASON[term.season]}</div>
        <div className="flex flex-col space-y-2">
          <SortableContext
            items={term.courses.map(course => course.dndId)}
            strategy={verticalListSortingStrategy}
          >
            {term.courses.map(course => (
              <SortableCourse course={course} key={course.dndId} />
            ))}
          </SortableContext>
        </div>
      </div>
    </DroppableContainer>
  );
}

type ContainerProps = {
  children: React.ReactNode;
  id: string;
};

function DroppableContainer({ children, id }: ContainerProps) {
  const { setNodeRef } = useDroppable({
    id,
    data: {
      type: "term",
    },
  });

  return <div ref={setNodeRef}>{children}</div>;
}

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
      className={`w-full px-2 py-1 rounded-md border border-solid shadow-sm flex flex-row justify-start items-center space-x-2 bg-white hover:scale-105 transition-transform ${
        isOverlay && "opacity-40"
      } ${isDragging && "scale-105"}`}
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

export { Plan, Course };
