import {
  DndPlan,
  DndYear,
  Plan,
  TERM_SEASON_INDEX_MAP,
  TermSeason,
} from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function preparePlanForDnd(plan: Plan): DndPlan {
  const dndSchedule = plan.schedule.map((year, index) => {
    return year.map(term => ({
      dndId: `${index}-${term.season}`,
      season: term.season,
      status: term.status,
      courses: term.courses.map(course => ({
        name: course.name,
        courseId: course.courseId,
        subject: course.subject,
        dndId: `${course.subject + course.courseId}`,
      })),
    }));
  }) as unknown;

  return {
    catalogYear: plan.catalogYear,
    major: plan.major,
    concentration: plan.concentration,
    schedule: dndSchedule as DndYear[],
  };
}

type ParsedDndIdTerm = {
  type: "term";
  yearIndex: number;
  termIndex: number;
};

type ParsedDndIdCourse = {
  type: "course";
  yearIndex: number;
  termIndex: number;
  courseIndex: number;
};

export function parseDndId(
  dndId: string,
  schedule: DndYear[],
): ParsedDndIdTerm | ParsedDndIdCourse {
  if (dndId.includes("-")) {
    const result = dndId.split("-");
    return {
      type: "term",
      yearIndex: parseInt(result[0]),
      termIndex: TERM_SEASON_INDEX_MAP[result[1] as TermSeason],
    };
  }

  const term = schedule
    .flat()
    .find(term => term.courses.some(course => course.dndId === dndId));

  // TODO: remove casting later
  const termIndex = TERM_SEASON_INDEX_MAP[term!.season];
  const [yearIndex] = term?.dndId.split("-") as [string, string];
  const courseIndex = term?.courses.findIndex(
    course => course.dndId === dndId,
  ) as number;

  return {
    type: "course",
    yearIndex: parseInt(yearIndex),
    termIndex,
    courseIndex,
  };
}
