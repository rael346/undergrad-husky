export type DndPlan = {
  catalogYear: number;
  major: string;
  concentration: string;
  schedule: DndYear[];
};

export type DndYear = DndRegularYear | DndSummerFullYear;

export type DndRegularYear = [
  DndTerm<TermSeason.FALL>,
  DndTerm<TermSeason.SPRING>,
  DndTerm<TermSeason.SUMMER_1>,
  DndTerm<TermSeason.SUMMER_2>,
];

export type DndSummerFullYear = [
  DndTerm<TermSeason.FALL>,
  DndTerm<TermSeason.SPRING>,
  DndTerm<TermSeason.SUMMER_FULL>,
];

export type DndTerm<T extends TermSeason> = Dnd<{
  courses: DndCourse[];
  status: TermStatus;
  season: T;
}>;

export type DndCourse = Dnd<Course>;

export type Dnd<T> = T & {
  dndId: string;
};

export type Plan = {
  catalogYear: number;
  major: string;
  concentration: string;
  schedule: Year[];
};

export type Year = RegularYear | SummerFullYear;

export type RegularYear = [
  Term<TermSeason.FALL>,
  Term<TermSeason.SPRING>,
  Term<TermSeason.SUMMER_1>,
  Term<TermSeason.SUMMER_2>,
];

export type SummerFullYear = [
  Term<TermSeason.FALL>,
  Term<TermSeason.SPRING>,
  Term<TermSeason.SUMMER_FULL>,
];

export type Term<T extends TermSeason> = {
  courses: Course[];
  status: TermStatus;
  season: T;
};

export enum TermStatus {
  COOP = "coop",
  CLASSES = "classes",
  INACTIVE = "inactive",
}

export enum TermSeason {
  FALL = "fl",
  SPRING = "sp",
  SUMMER_1 = "s1",
  SUMMER_2 = "s2",
  SUMMER_FULL = "sf",
}

export const TERM_SEASON_INDEX_MAP = {
  [TermSeason.FALL]: 0,
  [TermSeason.SPRING]: 1,
  [TermSeason.SUMMER_1]: 2,
  [TermSeason.SUMMER_2]: 3,
  [TermSeason.SUMMER_FULL]: 2,
};

export const DISPLAY_SEASON = {
  [TermSeason.FALL]: "FALL",
  [TermSeason.SPRING]: "SPRING",
  [TermSeason.SUMMER_1]: "SUMMER 1",
  [TermSeason.SUMMER_2]: "SUMMER 2",
  [TermSeason.SUMMER_FULL]: "SUMMER FULL",
};

export type Course = {
  name: string;
  courseId: number;
  subject: string;
};

export type CourseMetaData = {
  numCreditsMin: number;
  numCreditsMax: number;
};
