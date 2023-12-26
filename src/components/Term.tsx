import { SortableCourse } from "@/components/Course";
import { usePlanStore } from "@/stores/planStore";
import { DISPLAY_SEASON } from "@/types";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useShallow } from "zustand/react/shallow";

function Term({
  termDndId,
  yearIndex,
  termIndex,
}: {
  termDndId: string;
  yearIndex: number;
  termIndex: number;
}) {
  const term = usePlanStore(
    useShallow(state => {
      const term = state.schedule[yearIndex].terms[termIndex];

      return {
        season: term.season,
        status: term.status,
      };
    }),
  );

  const courseDndIds = usePlanStore(
    useShallow(state =>
      state.schedule[yearIndex].terms[termIndex].courses.map(
        course => course.dndId,
      ),
    ),
  );

  const { setNodeRef } = useDroppable({
    id: termDndId,
    data: {
      type: "term",
      dndId: termDndId,
      location: {
        yearIndex,
        termIndex,
      },
    },
  });

  return (
    <div className="px-2 py-2 flex flex-col space-y-2" ref={setNodeRef}>
      <div className="font-semibold">{DISPLAY_SEASON[term.season]}</div>
      <div className="flex flex-col space-y-2">
        <SortableContext
          items={courseDndIds}
          strategy={verticalListSortingStrategy}
        >
          {courseDndIds.map((courseDndId, courseIndex) => (
            <SortableCourse
              dndId={courseDndId}
              yearIndex={yearIndex}
              termIndex={termIndex}
              courseIndex={courseIndex}
              key={courseDndId}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}

export { Term };
