import { DndPlan, DndYear, Plan } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function preparePlanForDnd(plan: Plan): DndPlan {
  const courseCount = new Map<string, number>();

  const dndSchedule = plan.schedule.map((year, index) => {
    return year.map(term => ({
      dndId: `${index}-${term.season}`,
      season: term.season,
      status: term.status,
      courses: term.courses.map(course => {
        const courseCode = `${course.subject + course.courseId}`;
        const newCount = courseCount.has(courseCode)
          ? courseCount.get(courseCode)! + 1
          : 1;

        courseCount.set(courseCode, newCount);

        const dndId =
          newCount > 1 ? `${courseCode}-${newCount}` : `${courseCode}`;

        console.log();

        return {
          name: course.name,
          courseId: course.courseId,
          subject: course.subject,
          dndId,
        };
      }),
    }));
  }) as unknown;

  return {
    catalogYear: plan.catalogYear,
    major: plan.major,
    concentration: plan.concentration,
    schedule: dndSchedule as DndYear[],
  };
}
