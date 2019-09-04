export interface User {
  name: string;
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
