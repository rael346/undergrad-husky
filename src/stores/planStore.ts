import { TEST_PLAN } from "@/constants";
import { preparePlanForDnd } from "@/lib/utils";
import { DndCourse, DndCourseLocation, DndData, DndPlan } from "@/types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type Actions = {
  setActive: (activeData: DndData | null) => void;
  moveCourse: (
    activeLocation: DndCourseLocation,
    overLocation: DndCourseLocation,
  ) => void;
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
