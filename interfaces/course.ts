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
  state: number;
  price: string;
}
