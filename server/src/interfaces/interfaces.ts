export interface Post {
  id: string;
  body: string;
  title: string;
  comments: Comment[];
  likes: Like[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface Comment {
  id: string;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface Like {
  id: string;
  likedBy: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface Pagination {
  offset: number;
  limit: number;
}
