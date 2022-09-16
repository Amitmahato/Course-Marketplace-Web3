import { COURSE_STATE } from "@utils/normalize";

export interface course {
  id: string;
  type: string;
  title: string;
  description: string;
  coverImage: string;
  author: string;
  link: string;
  slug: string;
  wsl: string[];
  createdAt: string;
}

export interface CourseOwnership {
  id: string;
  proof: string;
  owner: string;
  state: COURSE_STATE;
  price: string;
}

export interface IOwnedCourse extends course, CourseOwnership {
  ownedCourseId: string;
}

export interface IManagedCourse extends CourseOwnership {
  ownedCourseId: string;
  hash: string;
}
