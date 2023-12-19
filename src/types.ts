export type Plan = {
  catalogYear: number;
  major: string;
  concentration: string;
  schedule: ScheduleYear[];
};

export type ScheduleYear =
  | [
      ScheduleTerm<TermSeason.FALL>,
      ScheduleTerm<TermSeason.SPRING>,
      ScheduleTerm<TermSeason.SUMMER_1>,
      ScheduleTerm<TermSeason.SUMMER_2>,
    ]
  | [
      ScheduleTerm<TermSeason.FALL>,
      ScheduleTerm<TermSeason.SPRING>,
      ScheduleTerm<TermSeason.SUMMER_FULL>,
    ];

export type ScheduleTerm<T extends TermSeason> = {
  courses: ScheduleCourse[];
  status: TermStatus;
  season: T;
  dndId: string;
};

export enum TermStatus {
  COOP = "coop",
  CLASSES = "classes",
  INACTIVE = "inactive",
}

export enum TermSeason {
  FALL = "FL",
  SPRING = "SP",
  SUMMER_1 = "S1",
  SUMMER_2 = "S2",
  SUMMER_FULL = "SF",
}

export type ScheduleCourse = {
  name: string;
  courseId: number;
  subject: string;
  numCreditsMin: number;
  numCreditsMax: number;
  dndId: string;
};
