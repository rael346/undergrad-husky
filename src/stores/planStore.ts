import { TEST_PLAN } from "@/constants";
import { preparePlanForDnd } from "@/lib/utils";
import {
  CourseMetadata,
  DndCourse,
  DndCourseLocation,
  DndData,
  DndPlan,
  DndTermLocation,
  DndYearLocation,
} from "@/types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type Actions = {
  setActive: (activeData: DndData | null) => void;
  moveCourse: (
    activeLocation: DndCourseLocation,
    overLocation: DndCourseLocation,
  ) => void;
  getTermDndIdsFromYear: (location: DndYearLocation) => string[];
  getCourseDndIdsFromTerm: (location: DndTermLocation) => string[];
  getCourseMetadata: (dndId: string) => CourseMetadata | undefined;
};

type State = DndPlan & {
  active: DndCourse | null;
};

const { dndPlan, courseMap } = await preparePlanForDnd(TEST_PLAN);

export const usePlanStore = create<State & Actions>()(
  immer((set, get) => ({
    ...dndPlan,

    getTermDndIdsFromYear(location) {
      return get().schedule[location.yearIndex].terms.map(term => term.dndId);
    },

    getCourseDndIdsFromTerm(location) {
      return get().schedule[location.yearIndex].terms[
        location.termIndex
      ].courses.map(course => course.dndId);
    },

    getCourseMetadata(dndId) {
      return courseMap.get(dndId.split("-")[0]);
    },

    active: null,
    setActive(activeData) {
      if (activeData === null) {
        set({ active: null });
        return;
      }

      if (activeData.type === "course") {
        const activeCourse =
          get().schedule[activeData.location.yearIndex].terms[
            activeData.location.termIndex
          ].courses[activeData.location.courseIndex];

        set({ active: activeCourse });
      }
    },

    moveCourse(activeLocation, overLocation) {
      set(plan => {
        const course = plan.schedule[activeLocation.yearIndex].terms[
          activeLocation.termIndex
        ].courses.splice(activeLocation.courseIndex, 1)[0];

        plan.schedule[overLocation.yearIndex].terms[
          overLocation.termIndex
        ].courses.splice(overLocation.courseIndex, 0, course);
      });
    },
  })),
);
