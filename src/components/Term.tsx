import { SortableCourse } from "@/components/Course";
import { DISPLAY_SEASON, DndTerm, TermSeason } from "@/types";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

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
      <div className="px-2 py-2 flex flex-col space-y-2">
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

export { Term };
