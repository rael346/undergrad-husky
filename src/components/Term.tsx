import { SortableCourse } from "@/components/Course";
import { Button } from "@/components/ui/button";
import { usePlanStore } from "@/stores/planStore";
import { DISPLAY_SEASON, DndTermLocation } from "@/types";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { PlusIcon } from "@radix-ui/react-icons";
import { useShallow } from "zustand/react/shallow";

function Term({
  termDndId,
  location,
}: {
  termDndId: string;
  location: DndTermLocation;
}) {
  const term = usePlanStore(
    useShallow(state => {
      const term = state.schedule[location.yearIndex].terms[location.termIndex];

      return {
        season: term.season,
        status: term.status,
      };
    }),
  );

  const courseDndIds = usePlanStore(
    useShallow(state => state.getCourseDndIdsFromTerm(location)),
  );

  const { setNodeRef } = useDroppable({
    id: termDndId,
    data: {
      type: "term",
      dndId: termDndId,
      location,
    },
  });

  return (
    <div
      className="px-4 py-4 flex flex-col space-y-4 justify-between border border-input rounded-lg bg-background"
      ref={setNodeRef}
    >
      <div className="flex flex-col space-y-4">
        <div className="flex flex-row items-center space-x-2">
          <span className="text-sm font-semibold">
            {DISPLAY_SEASON[term.season]}
          </span>
          <span className="text-sm text-muted-foreground">0 credits</span>
        </div>

        <div className="flex flex-col space-y-2">
          <SortableContext items={courseDndIds}>
            {courseDndIds.map((courseDndId, courseIndex) => (
              <SortableCourse
                dndId={courseDndId}
                location={{ ...location, courseIndex }}
                key={courseDndId}
              />
            ))}
          </SortableContext>
        </div>
      </div>

      <Button variant="ghost" className="justify-start">
        <PlusIcon />
        <span className="pl-2">Add Course</span>
      </Button>
    </div>
  );
}

export { Term };
