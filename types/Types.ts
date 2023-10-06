// User.ts
export type User = {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  Post: Post[];
  Comment: Comment[];
};

// VerificationToken.ts
export type VerificationToken = {
  identifier: string;
  token: string;
  expires: Date;
};

// Category.ts
export type Category = {
  id: string;
  slug: string;
  title: string;
  img: string | null;
  posts: Post[];
};

// Post.ts
export type Post = {
  id: string;
  createdAt: Date;
  slug: string;
  title: string;
  desc: string;
  img: string | null;
  views: number;
  catSlug: string;
  userEmail: string;
  comments?: Comment[];
  featured: boolean;
};

// Comment.ts
export type Comment = {
  id: string;
  createdAt: Date;
  desc: string;
  userEmail: string;
  user: User;
  postSlug: string;
  post: Post;
};
