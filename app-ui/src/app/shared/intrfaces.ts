export interface User {
  name?: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  userName: string;
  token: {
    exp: number,
    id: string
  };
}

export interface Post {
  id?: number;
  title: string;
  content: string;
  author_id?: number;
  author_name?: string;
  date?: string;
}
