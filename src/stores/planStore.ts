import {
  CourseMetadata,
  DndCourse,
  DndCourseLocation,
  DndData,
  DndPlan,
  DndTermLocation,
  DndYear,
  DndYearLocation,
  TermSeason,
  TermStatus,
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
  deleteYear: (location: DndYearLocation) => void;
  addYear: () => void;
};

type State = DndPlan & {
  active: DndCourse | null;
  courseMap: Map<string, CourseMetadata>;
  yearCount: number;
};

export const usePlanStore = create<State & Actions>()(
  immer((set, get) => ({
    catalogYear: 0,
    major: "",
    concentration: "",
    schedule: [],
    courseMap: new Map(),
    yearCount: 0,
    active: null,

    getTermDndIdsFromYear(location) {
      return get().schedule[location.yearIndex].terms.map(term => term.dndId);
    },

    getCourseDndIdsFromTerm(location) {
      return get().schedule[location.yearIndex].terms[
        location.termIndex
      ].courses.map(course => course.dndId);
    },

    getCourseMetadata(dndId) {
      return get().courseMap.get(dndId.split("-")[0]);
    },

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

    deleteYear(location) {
      set(plan => {
        plan.schedule.splice(location.yearIndex, 1);
      });
    },

    addYear() {
      set(plan => {
        const newYearCount = plan.yearCount + 1;
        const yearDndId = `year${newYearCount}`;
        const emptyYear: DndYear = {
          dndId: yearDndId,
          terms: [
            {
              dndId: `${yearDndId}-${TermSeason.FALL}`,
              status: TermStatus.CLASSES,
              season: TermSeason.FALL,
              courses: [],
            },
            {
              dndId: `${yearDndId}-${TermSeason.SPRING}`,
              status: TermStatus.CLASSES,
              season: TermSeason.SPRING,
              courses: [],
            },
            {
              dndId: `${yearDndId}-${TermSeason.SUMMER_1}`,
              status: TermStatus.CLASSES,
              season: TermSeason.SUMMER_1,
              courses: [],
            },
            {
              dndId: `${yearDndId}-${TermSeason.SUMMER_2}`,
              status: TermStatus.CLASSES,
              season: TermSeason.SUMMER_2,
              courses: [],
            },
          ],
        };

        plan.yearCount += 1;
        plan.schedule.push(emptyYear);
      });
    },
  })),
);
