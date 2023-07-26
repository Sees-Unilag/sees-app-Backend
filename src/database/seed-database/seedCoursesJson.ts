import { Prisma, Semester, Year } from '@prisma/client';

export const coursesJson: Prisma.CourseCreateInput[] = [
  {
    name: 'Engineering Pure Mathematics I',
    unit: 3,
    courseCode: 'GEG101',
    year: Year.ONE,
    semester: Semester.FIRST,
  },

  {
    name: 'Engineering Applied Maths1',
    unit: 3,
    courseCode: 'GEG103',
    year: Year.ONE,
    semester: Semester.FIRST,
  },
  {
    name: 'Workshop Practice',
    unit: 2,
    courseCode: 'MEG101',
    year: Year.ONE,
    semester: Semester.FIRST,
  },
];
