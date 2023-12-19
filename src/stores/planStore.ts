import { TEST_PLAN } from "@/constants";
import { Plan, ScheduleCourse } from "@/types";
import { create } from "zustand";

type Actions = {
  setActiveCourse: (dndId: string | null) => void;
};

type State = Plan & {
  activeCourse: ScheduleCourse | null;
};

const initialState: Plan = TEST_PLAN;

const usePlanStore = create<State & Actions>((set, get) => ({
  ...initialState,
  activeCourse: null,
  setActiveCourse: (dndId: string | null) => {
    if (dndId === null) {
      set({ activeCourse: null });
      return;
    }

    const allCourses = get()
      .schedule.flat()
      .flatMap(value => value.courses);
    const activeCourse = allCourses.find(course => course.dndId === dndId);
    set({ activeCourse });
  },
}));

export { usePlanStore };
