import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { usePlanStore } from "@/stores/planStore";
import { ScheduleCourse, ScheduleTerm, TermSeason } from "@/types";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
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
  term: ScheduleTerm<
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

  const { setNodeRef } = useDroppable({
    id: term.dndId,
  });

  return (
    <div className="px-2 py-2 flex flex-col space-y-2" ref={setNodeRef}>
      <div className="font-semibold">{seasonMap[term.season]}</div>
      <div className="flex flex-col space-y-2">
        <SortableContext items={term.courses.map(course => course.dndId)}>
          {term.courses.map(course => (
            <SortableCourse course={course} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}

function SortableCourse({ course }: { course: ScheduleCourse }) {
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

function Course({ course }: { course: ScheduleCourse }) {
  return (
    <Button variant={"outline"} className="flex flex-row space-x-1 bg-white">
      <span className="font-semibold">{course.subject + course.courseId}</span>
      <span>{course.name}</span>
    </Button>
  );
}

export { Plan };
