import { TEST_PLAN } from "@/constants";
import { parseDndId, preparePlanForDnd } from "@/lib/utils";
import { DndCourse, DndPlan, TERM_SEASON_INDEX_MAP } from "@/types";
import { arrayMove } from "@dnd-kit/sortable";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type Actions = {
  setActiveCourse: (dndId: string | null) => void;
  moveCourse: (activeDndId: string, overDndId: string | undefined) => void;
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

      const parsedDndId = parseDndId(dndId);

      // this case shouldn't be possible
      if (parsedDndId.type === "term") return;

      const { yearIndex, termSeason, courseCode } = parsedDndId;
      const activeCourse = get().schedule[yearIndex][
        TERM_SEASON_INDEX_MAP[termSeason]
      ].courses.find(course => course.subject + course.courseId === courseCode);

      set({ activeCourse });
    },

    moveCourse(activeDndId, overDndId) {
      if (!overDndId) return;

      const active = parseDndId(activeDndId);
      const over = parseDndId(overDndId);

      if (
        active.yearIndex !== over.yearIndex ||
        active.termSeason !== over.termSeason
      ) {
        return;
      }

      // for now only course is draggable, and therefore active
      if (active.type === "term") return;

      // TODO: add support for this later
      if (over.type === "term") return;

      const termCourses =
        get().schedule[active.yearIndex][
          TERM_SEASON_INDEX_MAP[active.termSeason]
        ].courses;

      const activeIndex = termCourses.findIndex(
        course => course.subject + course.courseId === active.courseCode,
      );

      const overIndex = termCourses.findIndex(
        course => course.subject + course.courseId === over.courseCode,
      );

      if (activeIndex === overIndex) return;

      // TODO: change arrayMove to toSpliced in the future
      set(plan => {
        plan.schedule[active.yearIndex][
          TERM_SEASON_INDEX_MAP[active.termSeason]
        ].courses = arrayMove(termCourses, activeIndex, overIndex);
      });
    },
  })),
);

export { usePlanStore };
