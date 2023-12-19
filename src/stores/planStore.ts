import { TEST_PLAN } from "@/constants";
import { Plan, ScheduleCourse } from "@/types";
import { create } from "zustand";

type Actions = {};

type State = Plan & {
  activeCourse: ScheduleCourse | null;
};

const initialState: Plan = TEST_PLAN;

const usePlanStore = create<State & Actions>(set => ({
  ...initialState,
  activeCourse: null,
}));

export { usePlanStore };
