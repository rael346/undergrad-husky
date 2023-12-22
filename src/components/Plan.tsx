import { DraggableDots } from "@/components/icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { usePlanStore } from "@/stores/planStore";
import { Course, DndCourse, DndTerm, TermSeason } from "@/types";
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
  const seasonMap = {
    [TermSeason.FALL]: "FALL",
    [TermSeason.SPRING]: "SPRING",
    [TermSeason.SUMMER_1]: "SUMMER 1",
    [TermSeason.SUMMER_2]: "SUMMER 2",
    [TermSeason.SUMMER_FULL]: "SUMMER FULL",
  };

  return (
    <div className="px-2 py-2 flex flex-col space-y-2 min-h-52">
      <div className="font-semibold">{seasonMap[term.season]}</div>
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
  );
}

function SortableCourse({ course }: { course: DndCourse }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: course.dndId });

  // https://github.com/clauderic/dnd-kit/issues/926
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Course course={course} />
    </div>
  );
}

function Course({
  course,
  isOverlay = false,
}: {
  course: Course;
  isOverlay?: boolean;
}) {
  return (
    <div
      className={`w-full px-2 py-1 rounded-md border border-solid shadow-sm flex flex-row justify-start items-center space-x-2 bg-white hover:scale-105 transition-transform ${
        isOverlay && "opacity-40"
      }`}
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
