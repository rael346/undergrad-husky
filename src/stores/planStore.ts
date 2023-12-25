import { TEST_PLAN } from "@/constants";
import { preparePlanForDnd } from "@/lib/utils";
import { DndCourse, DndPlan } from "@/types";
import { Active, Over } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type Actions = {
  setActive: (activeData: DndData | null) => void;
  moveCourseToSameTerm: (active: Active, over: Over) => void;
  moveCourseToDifferentTerm: (active: Active, over: Over) => void;
};

type State = DndPlan & {
  active: DndCourse | null;
};

const initialState: DndPlan = preparePlanForDnd(TEST_PLAN);

export const usePlanStore = create<State & Actions>()(
  immer((set, get) => ({
    ...initialState,

    active: null,
    setActive(activeData) {
      if (activeData === null) {
        set({ active: null });
        return;
      }

      if (activeData.type === "course") {
        const activeCourse =
          get().schedule[activeData.yearIndex].terms[activeData.termIndex]
            .courses[activeData.courseIndex];

        set({ active: activeCourse });
      }
    },

    moveCourseToSameTerm(active, over) {
      const activeData = active.data.current as DndData | undefined;
      const overData = over.data.current as DndData | undefined;

      if (!activeData || !overData) {
        return;
      }

      if (activeData.type !== "course" || overData.type !== "course") {
        return;
      }

      const schedule = get().schedule;

      if (
        // courses in different year/term
        activeData.yearIndex !== overData.yearIndex ||
        activeData.termIndex !== overData.termIndex ||
        // active course didn't change position
        activeData.courseIndex === overData.courseIndex
      ) {
        return;
      }

      const termCourses =
        schedule[activeData.yearIndex].terms[activeData.termIndex].courses;

      set(plan => {
        plan.schedule[activeData.yearIndex].terms[
          activeData.termIndex
        ].courses = arrayMove(
          termCourses,
          activeData.courseIndex,
          overData.courseIndex,
        );
      });
    },

    moveCourseToDifferentTerm(active, over) {
      const activeData = active.data.current as DndData | undefined;
      const overData = over.data.current as DndData | undefined;

      if (!activeData || !overData) {
        return;
      }

      if (activeData.type !== "course") {
        return;
      }

      if (overData.type !== "course" && overData.type !== "term") {
        return;
      }

      let newIndex: number;
      let overYearIndex: number;
      let overTermIndex: number;
      const schedule = get().schedule;

      if (overData.type === "term") {
        newIndex = 1;
        overYearIndex = overData.yearIndex;
        overTermIndex = overData.termIndex;
      }

      if (overData.type === "course") {
        const isBelowOverItem =
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height;

        const modifier = isBelowOverItem ? 1 : 0;
        newIndex = overData.courseIndex + modifier;
        overYearIndex = overData.yearIndex;
        overTermIndex = overData.termIndex;
      }

      const activeCourse =
        schedule[activeData.yearIndex].terms[activeData.termIndex].courses[
          activeData.courseIndex
        ];

      set(plan => {
        plan.schedule[activeData.yearIndex].terms[
          activeData.termIndex
        ].courses.splice(activeData.courseIndex, 1);

        plan.schedule[overYearIndex].terms[overTermIndex].courses.splice(
          newIndex,
          0,
          activeCourse,
        );
      });
    },
  })),
);

export type DndData = DndCourseData | DndTermData;

export type DndCourseData = {
  type: "course";
  dndId: string;
  yearIndex: number;
  termIndex: number;
  courseIndex: number;
};

export type DndTermData = {
  type: "term";
  dndId: string;
  yearIndex: number;
  termIndex: number;
};
