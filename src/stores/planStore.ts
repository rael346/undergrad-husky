import { TEST_PLAN } from "@/constants";
import { preparePlanForDnd } from "@/lib/utils";
import { DndCourse, DndPlan, DndYear } from "@/types";
import { Active, Over } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type Actions = {
  setActiveCourse: (dndId: string | null) => void;
  moveCourseToSameTerm: (active: Active, over: Over) => void;
  moveCourseToDifferentTerm: (active: Active, over: Over) => void;
};

type State = DndPlan & {
  activeCourse: DndCourse | null;
};

const initialState: DndPlan = preparePlanForDnd(TEST_PLAN);

export const usePlanStore = create<State & Actions>()(
  immer((set, get) => ({
    ...initialState,

    activeCourse: null,
    setActiveCourse(dndId) {
      if (dndId === null) {
        set({ activeCourse: null });
        return;
      }

      const activeIndexes = getCourseIndex(dndId, get().schedule);

      const activeCourse =
        get().schedule[activeIndexes.yearIndex].terms[activeIndexes.termIndex]
          .courses[activeIndexes.courseIndex];

      set({ activeCourse });
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
      const activeCourse = getCourseIndex(activeData.dndId, schedule);
      const overCourse = getCourseIndex(overData.dndId, schedule);

      if (
        // courses in different year/term
        activeCourse.yearIndex !== overCourse.yearIndex ||
        activeCourse.termIndex !== overCourse.termIndex ||
        // active course didn't change position
        activeCourse.courseIndex === overCourse.courseIndex
      ) {
        return;
      }

      const termCourses =
        schedule[activeCourse.yearIndex].terms[activeCourse.termIndex].courses;

      set(plan => {
        plan.schedule[activeCourse.yearIndex].terms[
          activeCourse.termIndex
        ].courses = arrayMove(
          termCourses,
          activeCourse.courseIndex,
          overCourse.courseIndex,
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
        const overTerm = getTermIndex(overData.dndId, schedule);
        overYearIndex = overTerm.yearIndex;
        overTermIndex = overTerm.termIndex;
      }

      if (overData.type === "course") {
        const overCourse = getCourseIndex(overData.dndId, schedule);
        const isBelowOverItem =
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height;

        const modifier = isBelowOverItem ? 1 : 0;
        newIndex = overCourse.courseIndex + modifier;
        overYearIndex = overCourse.yearIndex;
        overTermIndex = overCourse.termIndex;
      }

      const activeIndexes = getCourseIndex(activeData.dndId, schedule);
      const activeCourse =
        schedule[activeIndexes.yearIndex].terms[activeIndexes.termIndex]
          .courses[activeIndexes.courseIndex];

      set(plan => {
        plan.schedule[activeIndexes.yearIndex].terms[
          activeIndexes.termIndex
        ].courses.splice(activeIndexes.courseIndex, 1);

        plan.schedule[overYearIndex].terms[overTermIndex].courses.splice(
          newIndex,
          0,
          activeCourse,
        );
      });
    },
  })),
);

function getTermIndex(termDndId: string, schedule: DndYear[]) {
  const yearIndex = schedule.findIndex(year =>
    year.terms.some(term => term.dndId === termDndId),
  );
  const termIndex = schedule[yearIndex].terms.findIndex(
    term => term.dndId === termDndId,
  );

  return {
    yearIndex,
    termIndex,
  };
}

function getCourseIndex(courseDndId: string, schedule: DndYear[]) {
  const yearIndex = schedule.findIndex(year =>
    year.terms.some(term =>
      term.courses.some(course => course.dndId === courseDndId),
    ),
  );
  const termIndex = schedule[yearIndex].terms.findIndex(term =>
    term.courses.some(course => course.dndId === courseDndId),
  );

  const courseIndex = schedule[yearIndex].terms[termIndex].courses.findIndex(
    course => course.dndId === courseDndId,
  );

  return {
    yearIndex,
    termIndex,
    courseIndex,
  };
}

type DndData = DndCourseData | DndTermData;

type DndCourseData = {
  type: "course";
  dndId: string;
};

type DndTermData = {
  type: "term";
  dndId: string;
};
