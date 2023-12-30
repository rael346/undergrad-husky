import { Plan, Year, TermSeason, TermStatus } from "@/types";

const YEAR_1: Year = [
  {
    status: TermStatus.CLASSES,
    season: TermSeason.FALL,
    courses: [
      {
        subject: "CS",
        classId: "1200",
      },
      {
        subject: "CS",
        classId: "2500",
      },
      {
        subject: "CS",
        classId: "1800",
      },
      {
        subject: "CS",
        classId: "2501",
      },
    ],
  },
  {
    status: TermStatus.CLASSES,
    season: TermSeason.SPRING,
    courses: [
      {
        subject: "CS",
        classId: "2510",
      },
      {
        subject: "CS",
        classId: "2810",
      },
      {
        subject: "CS",
        classId: "2511",
      },
    ],
  },
  {
    status: TermStatus.CLASSES,
    season: TermSeason.SUMMER_1,
    courses: [
      {
        subject: "CS",
        classId: "3500",
      },
      {
        subject: "CS",
        classId: "3501",
      },
    ],
  },
  {
    status: TermStatus.CLASSES,
    season: TermSeason.SUMMER_2,
    courses: [
      {
        subject: "CS",
        classId: "3000",
      },
      {
        classId: "3001",
        subject: "CS",
      },
    ],
  },
];

const YEAR_2: Year = [
  {
    status: TermStatus.CLASSES,
    season: TermSeason.FALL,
    courses: [
      {
        subject: "CS",
        classId: "4100",
      },
      {
        subject: "MATH",
        classId: "3081",
      },
    ],
  },
  {
    status: TermStatus.COOP,
    season: TermSeason.SPRING,
    courses: [],
  },
  {
    status: TermStatus.COOP,
    season: TermSeason.SUMMER_1,
    courses: [],
  },
  {
    status: TermStatus.CLASSES,
    season: TermSeason.SUMMER_2,
    courses: [
      {
        subject: "CY",
        classId: "2550",
      },
    ],
  },
];

const YEAR_3: Year = [
  {
    status: TermStatus.CLASSES,
    season: TermSeason.FALL,
    courses: [
      {
        subject: "CS",
        classId: "3800",
      },
      {
        subject: "CS",
        classId: "3700",
      },
      {
        subject: "CS",
        classId: "4973",
      },
      {
        subject: "MATH",
        classId: "1365",
      },
    ],
  },
  {
    status: TermStatus.COOP,
    season: TermSeason.SPRING,
    courses: [],
  },
  {
    status: TermStatus.COOP,
    season: TermSeason.SUMMER_1,
    courses: [
      {
        classId: "3302",
        subject: "ENGW",
      },
    ],
  },
  {
    status: TermStatus.CLASSES,
    season: TermSeason.SUMMER_2,
    courses: [
      {
        subject: "DS",
        classId: "4400",
      },
    ],
  },
];

const YEAR_4: Year = [
  {
    status: TermStatus.CLASSES,
    season: TermSeason.FALL,
    courses: [
      {
        subject: "CS",
        classId: "4530",
      },
      {
        subject: "CS",
        classId: "4973",
      },
      {
        subject: "EECE",
        classId: "2322",
      },
      {
        subject: "EECE",
        classId: "2323",
      },
      {
        subject: "GAME",
        classId: "2500",
      },
    ],
  },
  {
    status: TermStatus.CLASSES,
    season: TermSeason.SPRING,
    courses: [
      {
        subject: "CAEP",
        classId: "1280",
      },
      {
        subject: "CS",
        classId: "4520",
      },
      {
        subject: "CS",
        classId: "5600",
      },
      {
        subject: "DS",
        classId: "3000",
      },
    ],
  },
  {
    status: TermStatus.CLASSES,
    season: TermSeason.SUMMER_1,
    courses: [],
  },
  {
    status: TermStatus.INACTIVE,
    season: TermSeason.SUMMER_2,
    courses: [],
  },
];

export const TEST_PLAN: Plan = {
  catalogYear: 2021,
  major: "Computer Science, BSCS",
  concentration: "Artificial Intelligence",
  schedule: [YEAR_1, YEAR_2, YEAR_3, YEAR_4],
};

export const MY_PLAN = {
  name: "Duy Tran",
  catalogYear: 2021,
  major: "Computer Science, BSCS",
  concentration: "Artificial Intelligence",
  schedule: {
    years: [
      {
        year: 1,
        fall: {
          season: "FL",
          status: "CLASSES",
          classes: [
            {
              name: "First Year Seminar",
              subject: "CS",
              classId: "1200",
              numCreditsMax: 1,
              numCreditsMin: 1,
              prereqs: {
                type: "and",
                values: [],
              },
              coreqs: {
                type: "and",
                values: [],
              },
              nupaths: [],
              id: "1200-CS-1",
            },
            {
              name: "Fundamentals of Computer Science 1",
              subject: "CS",
              classId: "2500",
              numCreditsMax: 4,
              numCreditsMin: 4,
              prereqs: {
                type: "and",
                values: [],
              },
              coreqs: {
                type: "and",
                values: [
                  {
                    classId: "2501",
                    subject: "CS",
                  },
                ],
              },
              nupaths: ["Formal/Quant Reasoning", "Natural/Designed World"],
              id: "2500-CS-2",
            },
            {
              name: "Discrete Structures",
              subject: "CS",
              classId: "1800",
              numCreditsMax: 4,
              numCreditsMin: 4,
              prereqs: {
                type: "and",
                values: [],
              },
              coreqs: {
                type: "and",
                values: [
                  {
                    classId: "1802",
                    subject: "CS",
                  },
                ],
              },
              nupaths: ["Formal/Quant Reasoning"],
              id: "1800-CS-3",
            },
            {
              name: "Seminar for CS 1800",
              subject: "CS",
              classId: "1802",
              numCreditsMax: 1,
              numCreditsMin: 1,
              prereqs: {
                type: "and",
                values: [],
              },
              coreqs: {
                type: "and",
                values: [
                  {
                    classId: "1800",
                    subject: "CS",
                  },
                ],
              },
              nupaths: [],
              id: "1802-CS-4",
            },
            {
              name: "Lab for CS 2500",
              subject: "CS",
              classId: "2501",
              numCreditsMax: 1,
              numCreditsMin: 1,
              prereqs: {
                type: "and",
                values: [],
              },
              coreqs: {
                type: "and",
                values: [
                  {
                    classId: "2500",
                    subject: "CS",
                  },
                ],
              },
              nupaths: [],
              id: "2501-CS-5",
            },
            {
              name: "First-Year Writing",
              subject: "ENGW",
              classId: "1111",
              numCreditsMax: 4,
              numCreditsMin: 4,
              prereqs: {
                type: "and",
                values: [],
              },
              coreqs: {
                type: "and",
                values: [],
              },
              nupaths: ["1st Yr Writing"],
              id: "1111-ENGW-6",
            },
          ],
          id: "1-FL",
        },
        spring: {
          season: "SP",
          status: "CLASSES",
          classes: [
            {
              name: "Fundamentals of Computer Science 2",
              subject: "CS",
              classId: "2510",
              numCreditsMax: 4,
              numCreditsMin: 4,
              prereqs: {
                type: "and",
                values: [
                  {
                    classId: "2500",
                    subject: "CS",
                  },
                ],
              },
              coreqs: {
                type: "and",
                values: [
                  {
                    classId: "2511",
                    subject: "CS",
                  },
                ],
              },
              nupaths: ["Analyzing/Using Data", "Natural/Designed World"],
              id: "2510-CS-7",
            },
            {
              name: "Mathematics of Data Models",
              subject: "CS",
              classId: "2810",
              numCreditsMax: 4,
              numCreditsMin: 4,
              prereqs: {
                type: "and",
                values: [
                  {
                    classId: "1800",
                    subject: "CS",
                  },
                  {
                    classId: "2500",
                    subject: "CS",
                  },
                ],
              },
              coreqs: {
                type: "and",
                values: [],
              },
              nupaths: ["Analyzing/Using Data", "Formal/Quant Reasoning"],
              id: "2810-CS-8",
            },
            {
              name: "Lab for CS 2510",
              subject: "CS",
              classId: "2511",
              numCreditsMax: 1,
              numCreditsMin: 1,
              prereqs: {
                type: "and",
                values: [],
              },
              coreqs: {
                type: "and",
                values: [
                  {
                    classId: "2510",
                    subject: "CS",
                  },
                ],
              },
              nupaths: [],
              id: "2511-CS-9",
            },
          ],
          id: "1-SP",
        },
        summer1: {
          season: "S1",
          status: "INACTIVE",
          classes: [
            {
              name: "Object-Oriented Design",
              subject: "CS",
              classId: "3500",
              numCreditsMax: 4,
              numCreditsMin: 4,
              prereqs: {
                type: "or",
                values: [
                  {
                    classId: "2510",
                    subject: "CS",
                  },
                  {
                    classId: "1500",
                    missing: true,
                    subject: "CS",
                  },
                  {
                    classId: "2560",
                    subject: "EECE",
                  },
                ],
              },
              coreqs: {
                type: "and",
                values: [
                  {
                    classId: "3501",
                    subject: "CS",
                  },
                ],
              },
              nupaths: ["Analyzing/Using Data", "Natural/Designed World"],
              id: "3500-CS-10",
            },
            {
              name: "Lab for CS 3500",
              subject: "CS",
              classId: "3501",
              numCreditsMax: 1,
              numCreditsMin: 1,
              prereqs: {
                type: "and",
                values: [],
              },
              coreqs: {
                type: "and",
                values: [
                  {
                    classId: "3500",
                    subject: "CS",
                  },
                ],
              },
              nupaths: [],
              id: "3501-CS-11",
            },
          ],
          id: "1-S1",
        },
        summer2: {
          season: "S2",
          status: "INACTIVE",
          classes: [
            {
              name: "Algorithms and Data",
              subject: "CS",
              classId: "3000",
              numCreditsMax: 4,
              numCreditsMin: 4,
              prereqs: {
                type: "or",
                values: [
                  {
                    type: "and",
                    values: [
                      {
                        type: "or",
                        values: [
                          {
                            classId: "2510",
                            subject: "CS",
                          },
                          {
                            classId: "2500",
                            subject: "DS",
                          },
                        ],
                      },
                      {
                        classId: "1800",
                        subject: "CS",
                      },
                    ],
                  },
                  {
                    classId: "2160",
                    subject: "EECE",
                  },
                ],
              },
              coreqs: {
                type: "and",
                values: [
                  {
                    classId: "3001",
                    subject: "CS",
                  },
                ],
              },
              nupaths: ["Formal/Quant Reasoning"],
              id: "3000-CS-12",
            },
            {
              name: "Recitation for CS 3000",
              classId: "3001",
              subject: "CS",
              prereqs: {
                type: "and",
                values: [],
              },
              coreqs: {
                type: "and",
                values: [
                  {
                    classId: "3000",
                    subject: "CS",
                  },
                ],
              },
              nupaths: [],
              numCreditsMin: 0,
              numCreditsMax: 0,
              id: "3001-CS-13",
            },
          ],
          id: "1-S2",
        },
        isSummerFull: false,
      },
      {
        year: 2,
        fall: {
          season: "FL",
          status: "CLASSES",
          classes: [
            {
              name: "Professional Development for Khoury Co-op",
              subject: "CS",
              classId: "1210",
              numCreditsMax: 1,
              numCreditsMin: 1,
              prereqs: {
                type: "or",
                values: [
                  {
                    classId: "2510",
                    subject: "CS",
                  },
                  {
                    classId: "2500",
                    subject: "DS",
                  },
                ],
              },
              coreqs: {
                type: "and",
                values: [],
              },
              nupaths: [],
              id: "1210-CS-14",
            },
            {
              name: "Artificial Intelligence",
              subject: "CS",
              classId: "4100",
              numCreditsMax: 4,
              numCreditsMin: 4,
              prereqs: {
                type: "or",
                values: [
                  {
                    classId: "3500",
                    subject: "CS",
                  },
                  {
                    classId: "3500",
                    subject: "DS",
                  },
                ],
              },
              coreqs: {
                type: "and",
                values: [],
              },
              nupaths: ["Capstone Experience", "Writing Intensive"],
              id: "4100-CS-15",
            },
            {
              name: "Probability and Statistics",
              classId: "3081",
              subject: "MATH",
              prereqs: {
                type: "or",
                values: [
                  {
                    classId: "1342",
                    subject: "MATH",
                  },
                  {
                    classId: "1252",
                    subject: "MATH",
                  },
                  {
                    classId: "1242",
                    subject: "MATH",
                  },
                ],
              },
              coreqs: {
                type: "and",
                values: [],
              },
              nupaths: ["Analyzing/Using Data"],
              numCreditsMin: 4,
              numCreditsMax: 4,
              id: "3081-MATH-16",
            },
          ],
          id: "2-FL",
        },
        spring: {
          season: "SP",
          status: "CLASSES",
          classes: [
            {
              name: "Co-op Education",
              classId: "Experiential Learning",
              subject: "",
              numCreditsMax: 8,
              numCreditsMin: 0,
              id: "Experiential Learning--17",
            },
          ],
          id: "2-SP",
        },
        summer1: {
          season: "S1",
          status: "INACTIVE",
          classes: [
            {
              name: "Co-op Education",
              classId: "Experiential Learning",
              subject: "",
              numCreditsMax: 8,
              numCreditsMin: 0,
              id: "Experiential Learning--18",
            },
          ],
          id: "2-S1",
        },
        summer2: {
          season: "S2",
          status: "INACTIVE",
          classes: [
            {
              name: "Foundations of Cybersecurity",
              subject: "CY",
              classId: "2550",
              numCreditsMax: 4,
              numCreditsMin: 4,
              prereqs: {
                type: "and",
                values: [
                  {
                    classId: "2500",
                    subject: "CS",
                  },
                ],
              },
              coreqs: {
                type: "and",
                values: [],
              },
              nupaths: [],
              id: "2550-CY-19",
            },
          ],
          id: "2-S2",
        },
        isSummerFull: false,
      },
      {
        year: 3,
        fall: {
          season: "FL",
          status: "CLASSES",
          classes: [
            {
              name: "Theory of Computation",
              subject: "CS",
              classId: "3800",
              numCreditsMax: 4,
              numCreditsMin: 4,
              prereqs: {
                type: "or",
                values: [
                  {
                    classId: "1500",
                    missing: true,
                    subject: "CS",
                  },
                  {
                    classId: "2510",
                    subject: "CS",
                  },
                  {
                    classId: "2160",
                    subject: "EECE",
                  },
                  {
                    classId: "2162",
                    missing: true,
                    subject: "EECE",
                  },
                  {
                    classId: "2164",
                    missing: true,
                    subject: "EECE",
                  },
                ],
              },
              coreqs: {
                type: "and",
                values: [],
              },
              nupaths: [],
              id: "3800-CS-20",
            },
            {
              name: "Introduction to Mathematical Reasoning",
              subject: "MATH",
              classId: "1365",
              numCreditsMax: 4,
              numCreditsMin: 4,
              prereqs: {
                type: "and",
                values: [],
              },
              coreqs: {
                type: "and",
                values: [],
              },
              nupaths: [],
              id: "1365-MATH-21",
            },
          ],
          id: "3-FL",
        },
        spring: {
          season: "SP",
          status: "CLASSES",
          classes: [
            {
              name: "Co-op Education",
              classId: "Experiential Learning",
              subject: "",
              numCreditsMax: 8,
              numCreditsMin: 0,
              id: "Experiential Learning--22",
            },
          ],
          id: "3-SP",
        },
        summer1: {
          season: "S1",
          status: "INACTIVE",
          classes: [
            {
              name: "Co-op Education",
              classId: "Experiential Learning",
              subject: "",
              numCreditsMax: 8,
              numCreditsMin: 0,
              id: "Experiential Learning--23",
            },
            {
              name: "Advanced Writing in the Technical Professions",
              subject: "ENGW",
              classId: "3302",
              numCreditsMax: 4,
              numCreditsMin: 4,
              prereqs: {
                type: "or",
                values: [
                  {
                    classId: "1102",
                    subject: "ENGW",
                  },
                  {
                    classId: "1111",
                    subject: "ENGW",
                  },
                  {
                    classId: "1102",
                    missing: true,
                    subject: "ENGL",
                  },
                  {
                    classId: "1111",
                    missing: true,
                    subject: "ENGL",
                  },
                ],
              },
              coreqs: {
                type: "and",
                values: [],
              },
              nupaths: ["Adv Writ Dscpl"],
              id: "3302-ENGW-24",
            },
          ],
          id: "3-S1",
        },
        summer2: {
          season: "S2",
          status: "INACTIVE",
          classes: [
            {
              name: "Machine Learning and Data Mining 1",
              subject: "DS",
              classId: "4400",
              numCreditsMax: 4,
              numCreditsMin: 4,
              prereqs: {
                type: "or",
                values: [
                  {
                    type: "and",
                    values: [
                      {
                        type: "or",
                        values: [
                          {
                            classId: "4100",
                            missing: true,
                            subject: "DS",
                          },
                          {
                            classId: "3000",
                            subject: "DS",
                          },
                        ],
                      },
                      {
                        type: "or",
                        values: [
                          {
                            classId: "2810",
                            subject: "CS",
                          },
                          {
                            classId: "2350",
                            subject: "ECON",
                          },
                          {
                            classId: "2500",
                            subject: "ENVR",
                          },
                          {
                            classId: "3081",
                            subject: "MATH",
                          },
                          {
                            classId: "2301",
                            subject: "MGSC",
                          },
                          {
                            classId: "2210",
                            subject: "PHTH",
                          },
                          {
                            classId: "2320",
                            subject: "PSYC",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: "and",
                    values: [
                      {
                        classId: "2810",
                        subject: "CS",
                      },
                      {
                        classId: "3500",
                        subject: "CS",
                      },
                    ],
                  },
                ],
              },
              coreqs: {
                type: "and",
                values: [],
              },
              nupaths: [
                "Analyzing/Using Data",
                "Capstone Experience",
                "Writing Intensive",
              ],
              id: "4400-DS-25",
            },
          ],
          id: "3-S2",
        },
        isSummerFull: false,
      },
      {
        year: 4,
        fall: {
          season: "FL",
          status: "CLASSES",
          classes: [
            {
              name: "Fundamentals of Software Engineering",
              subject: "CS",
              classId: "4530",
              numCreditsMax: 4,
              numCreditsMin: 4,
              prereqs: {
                type: "and",
                values: [
                  {
                    classId: "3500",
                    subject: "CS",
                  },
                ],
              },
              coreqs: {
                type: "and",
                values: [],
              },
              nupaths: ["Writing Intensive"],
              id: "4530-CS-26",
            },
            {
              name: "Fundamentals of Digital Design and Computer Organization",
              subject: "EECE",
              classId: "2322",
              numCreditsMax: 4,
              numCreditsMin: 4,
              prereqs: {
                type: "or",
                values: [
                  {
                    classId: "2160",
                    subject: "EECE",
                  },
                  {
                    type: "and",
                    values: [
                      {
                        classId: "1800",
                        subject: "CS",
                      },
                      {
                        classId: "2510",
                        subject: "CS",
                      },
                    ],
                  },
                ],
              },
              coreqs: {
                type: "and",
                values: [
                  {
                    classId: "2323",
                    subject: "EECE",
                  },
                ],
              },
              nupaths: [],
              id: "2322-EECE-27",
            },
            {
              name: "Lab for EECE 2322",
              classId: "2323",
              subject: "EECE",
              prereqs: {
                type: "and",
                values: [],
              },
              coreqs: {
                type: "and",
                values: [
                  {
                    classId: "2322",
                    subject: "EECE",
                  },
                ],
              },
              nupaths: [],
              numCreditsMin: 1,
              numCreditsMax: 1,
              id: "2323-EECE-28",
            },
          ],
          id: "4-FL",
        },
        spring: {
          season: "SP",
          status: "CLASSES",
          classes: [
            {
              name: "Computer Systems",
              subject: "CS",
              classId: "3650",
              numCreditsMax: 4,
              numCreditsMin: 4,
              prereqs: {
                type: "or",
                values: [
                  {
                    classId: "2510",
                    subject: "CS",
                  },
                  {
                    classId: "1500",
                    missing: true,
                    subject: "CS",
                  },
                  {
                    classId: "2560",
                    subject: "EECE",
                  },
                ],
              },
              coreqs: {
                type: "and",
                values: [],
              },
              nupaths: [],
              id: "3650-CS-29",
            },
          ],
          id: "4-SP",
        },
        summer1: {
          season: "S1",
          status: "INACTIVE",
          classes: [],
          id: "4-S1",
        },
        summer2: {
          season: "S2",
          status: "INACTIVE",
          classes: [],
          id: "4-S2",
        },
        isSummerFull: false,
      },
    ],
  },
  id: 1,
  createdAt: "2023-12-17T17:28:47.214Z",
  updatedAt: "2023-12-17T17:45:23.352Z",
  student: {
    isOnboarded: false,
    email: "guest@guest.com",
    isEmailConfirmed: false,
    createdAt: "2023-12-17T17:26:50.821Z",
    updatedAt: "2023-12-17T17:26:50.821Z",
    plans: [],
  },
};
