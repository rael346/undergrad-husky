export type SchedulePlan = {
  years: ScheduleYear[];
};

export type ScheduleYear = {
  fall: ScheduleTerm<TermSeason.FALL>;
  spring: ScheduleTerm<TermSeason.SPRING>;
} & (
  | {
      isSummerFull: false;
      summer1: ScheduleTerm<TermSeason.SUMMER_1>;
      summer2: ScheduleTerm<TermSeason.SUMMER_2>;
    }
  | {
      isSummerFull: true;
      summerFull: ScheduleTerm<TermSeason.SUMMER_FULL>;
    }
);

export type ScheduleTerm<T extends TermSeason> = {
  classes: ScheduleCourse[];
  status: TermStatus;
  season: T;
};

export enum TermStatus {
  COOP = "coop",
  CLASSES = "classes",
  INACTIVE = "inactive",
}

export enum TermSeason {
  FALL = "fall",
  SPRING = "spring",
  SUMMER_1 = "summer1",
  SUMMER_2 = "summer2",
  SUMMER_FULL = "summer_full",
}

export type ScheduleCourse = {
  name: string;
  classId: number;
  subject: string;
  numCreditsMin: number;
  numCreditMax: number;
};
