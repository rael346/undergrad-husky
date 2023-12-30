import {
  CourseMetadata,
  DndPlan,
  DndRegularYear,
  DndSummerFullYear,
  DndYear,
  Plan,
} from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function preparePlanForDnd(
  plan: Plan,
): Promise<{ dndPlan: DndPlan; courseMap: Map<string, CourseMetadata> }> {
  const courseCount = new Map<string, number>();
  const input = plan.schedule
    .flat()
    .flatMap(term => term.courses)
    .map(
      course => `{ subject: "${course.subject}", classId: "${course.classId}"}`,
    )
    .join(",");

  const result = await fetch("https://api.searchneu.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `{
        bulkClasses(input: [${input}]) {
          latestOccurrence {
            name
            subject
            classId
            minCredits
            maxCredits
            prereqs
            coreqs
            nupath
            termId
          }
        }
      }`,
    }),
  });

  const json = await result.json();
  const coursesMetadata = json.data.bulkClasses as {
    latestOccurrence: CourseMetadata;
  }[];

  // const termsMetaData = new Map<string, TermMetadata>();
  // const yearMetaData = new Map<string, YearMetadata>();

  const dndSchedule = plan.schedule.map((year, yearIndex) => {
    const yearDndId = `year${yearIndex}`;
    return {
      dndId: yearDndId,
      terms: year.map(term => {
        return {
          dndId: `${yearDndId}-${term.season}`,
          season: term.season,
          status: term.status,
          courses: term.courses.map(course => {
            const courseCode = `${course.subject + course.classId}`;
            const newCount = courseCount.has(courseCode)
              ? courseCount.get(courseCode)! + 1
              : 1;

            courseCount.set(courseCode, newCount);

            const dndId = `${courseCode}-${newCount}`;

            return {
              classId: course.classId,
              subject: course.subject,
              dndId,
            };
          }),
        };
      }) as DndRegularYear | DndSummerFullYear,
    };
  });

  const dndPlan = {
    catalogYear: plan.catalogYear,
    major: plan.major,
    concentration: plan.concentration,
    schedule: dndSchedule as DndYear[],
  };

  return {
    dndPlan,
    courseMap: new Map(
      coursesMetadata.map(courseMetadata => [
        courseMetadata.latestOccurrence.subject +
          courseMetadata.latestOccurrence.classId,
        courseMetadata.latestOccurrence,
      ]),
    ),
  };
}
