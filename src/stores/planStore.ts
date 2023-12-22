import { TEST_PLAN } from "@/constants";
import { parseDndId, preparePlanForDnd } from "@/lib/utils";
import { DndCourse, DndPlan } from "@/types";
import { Active, Over } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type Actions = {
  setActiveCourse: (dndId: string | null) => void;
  moveCourseToSameTerm: (activeDndId: string, overDndId: string) => void;
  moveCourseToDifferentTerm: (active: Active, over: Over) => void;
};

type State = DndPlan & {
  activeCourse: DndCourse | null;
};

const initialState: DndPlan = preparePlanForDnd(TEST_PLAN);

const usePlanStore = create<State & Actions>()(
  immer((set, get) => ({
    ...initialState,

    activeCourse: null,
    setActiveCourse(dndId) {
      if (dndId === null) {
        set({ activeCourse: null });
        return;
      }

      const parsedDndId = parseDndId(dndId, get().schedule);

      // this case shouldn't be possible
      if (parsedDndId.type === "term") {
        return;
      }

      const { yearIndex, termIndex, courseIndex } = parsedDndId;
      const activeCourse =
        get().schedule[yearIndex][termIndex].courses[courseIndex];

      set({ activeCourse });
    },

    moveCourseToSameTerm(activeDndId, overDndId) {
      const schedule = get().schedule;
      const active = parseDndId(activeDndId, schedule);
      const over = parseDndId(overDndId, schedule);

      if (
        active.yearIndex !== over.yearIndex ||
        active.termIndex !== over.termIndex
      ) {
        return;
      }

      // for now only course is draggable, and therefore active
      if (active.type === "term" || over.type === "term") {
        return;
      }

      if (active.courseIndex === over.courseIndex) {
        return;
      }

      const termCourses = schedule[active.yearIndex][active.termIndex].courses;

      set(plan => {
        plan.schedule[active.yearIndex][active.termIndex].courses = arrayMove(
          termCourses,
          active.courseIndex,
          over.courseIndex,
        );
      });
    },

    moveCourseToDifferentTerm(active, over) {
      const schedule = get().schedule;
      const parsedActiveDndId = parseDndId(active.id as string, schedule);
      const parsedOverDndId = parseDndId(over.id as string, schedule);

      if (
        parsedActiveDndId.yearIndex === parsedOverDndId.yearIndex &&
        parsedActiveDndId.termIndex === parsedOverDndId.termIndex
      ) {
        return;
      }

      if (parsedActiveDndId.type === "term") {
        return;
      }

      let newIndex: number;

      if (parsedOverDndId.type === "term") {
        newIndex = 1;
      } else {
        const isBelowOverItem =
          over &&
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height;

        const modifier = isBelowOverItem ? 1 : 0;
        newIndex = parsedOverDndId.courseIndex + modifier;
      }

      const activeCourse =
        schedule[parsedActiveDndId.yearIndex][parsedActiveDndId.termIndex]
          .courses[parsedActiveDndId.courseIndex];

      set(plan => {
        plan.schedule[parsedActiveDndId.yearIndex][
          parsedActiveDndId.termIndex
        ].courses.splice(parsedActiveDndId.courseIndex, 1);

        plan.schedule[parsedOverDndId.yearIndex][
          parsedOverDndId.termIndex
        ].courses.splice(newIndex, 0, activeCourse);
      });
    },
  })),
);

export { usePlanStore };
