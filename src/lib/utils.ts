import { DndPlan, DndYear, Plan, TermSeason } from "@/types";
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
        dndId: `${index}-${term.season}-${course.subject + course.courseId}`,
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
  termSeason: TermSeason;
};

type ParsedDndIdCourse = {
  type: "course";
  yearIndex: number;
  termSeason: TermSeason;
  courseCode: string;
};

export function parseDndId(dndId: string): ParsedDndIdTerm | ParsedDndIdCourse {
  const result = dndId.split("-");

  if (result.length === 2) {
    return {
      type: "term",
      yearIndex: parseInt(result[0]),
      termSeason: result[1] as TermSeason,
    };
  }

  return {
    type: "course",
    yearIndex: parseInt(result[0]),
    termSeason: result[1] as TermSeason,
    courseCode: result[2],
  };
}
