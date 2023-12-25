import {
  Course,
  DndCourse,
  DndPlan,
  DndRegularYear,
  DndSummerFullYear,
  DndTerm,
  DndYear,
  Plan,
  Term,
  TermSeason,
  Year,
} from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function preparePlanForDnd(plan: Plan): DndPlan {
  const courseCount = new Map<string, number>();

  const dndSchedule = plan.schedule.map((year, yearIndex) =>
    prepareYearForDnd(year, yearIndex, courseCount),
  );

  return {
    catalogYear: plan.catalogYear,
    major: plan.major,
    concentration: plan.concentration,
    schedule: dndSchedule as DndYear[],
  };
}

function prepareYearForDnd(
  year: Year,
  yearIndex: number,
  courseCount: Map<string, number>,
): DndYear {
  const dndId = `year${yearIndex}`;
  return {
    dndId,
    terms: year.map(term => prepareTermForDnd(term, dndId, courseCount)) as
      | DndRegularYear
      | DndSummerFullYear,
  };
}

function prepareTermForDnd(
  term: Term<
    | TermSeason.FALL
    | TermSeason.SPRING
    | TermSeason.SUMMER_1
    | TermSeason.SUMMER_2
    | TermSeason.SUMMER_FULL
  >,
  yearDndId: string,
  courseCount: Map<string, number>,
): DndTerm<
  | TermSeason.FALL
  | TermSeason.SPRING
  | TermSeason.SUMMER_1
  | TermSeason.SUMMER_2
  | TermSeason.SUMMER_FULL
> {
  return {
    dndId: `${yearDndId}-${term.season}`,
    season: term.season,
    status: term.status,
    courses: term.courses.map(course =>
      prepareCourseForDnd(course, courseCount),
    ),
  };
}

function prepareCourseForDnd(
  course: Course,
  courseCount: Map<string, number>,
): DndCourse {
  const courseCode = `${course.subject + course.courseId}`;
  const newCount = courseCount.has(courseCode)
    ? courseCount.get(courseCode)! + 1
    : 1;

  courseCount.set(courseCode, newCount);

  const dndId = newCount > 1 ? `${courseCode}-${newCount}` : `${courseCode}`;

  return {
    name: course.name,
    courseId: course.courseId,
    subject: course.subject,
    dndId,
  };
}
