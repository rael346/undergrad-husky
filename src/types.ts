export type DndPlan = {
  catalogYear: number;
  major: string;
  concentration: string;
  schedule: DndYear[];
};

export type DndData = DndCourseData | DndTermData;

export type DndCourseData = {
  type: "course";
  dndId: string;
  location: DndCourseLocation;
};

export type DndTermData = {
  type: "term";
  dndId: string;
  location: DndTermLocation;
};

export type DndCourseLocation = {
  yearIndex: number;
  termIndex: number;
  courseIndex: number;
};

export type DndTermLocation = {
  yearIndex: number;
  termIndex: number;
};

export type DndYearLocation = {
  yearIndex: number;
};

export type DndYear = Dnd<{ terms: DndRegularYear | DndSummerFullYear }>;

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

export type Year = Term[];

export type Term = {
  courses: Course[];
  status: TermStatus;
  season: TermSeason;
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
  classId: string;
  subject: string;
};

export type CourseMetadata = {
  name: string;
  subject: string;
  classId: string;
  minCredits: number;
  maxCredits: number;
  prereqs: CourseRequisite;
  coreqs: CourseRequisite;
  termId: string;
};

export type TermMetadata = {
  season: TermSeason;
  status: TermStatus;
  credits: number;
};

export type YearMetadata = {
  credits: number;
};

export type CourseRequisite =
  | CourseAndRequisite
  | CourseOrRequisite
  | { subject: string; classId: string };

export type CourseAndRequisite = {
  type: "and";
  values: CourseRequisite[];
};

export type CourseOrRequisite = {
  type: "or";
  values: CourseRequisite[];
};
