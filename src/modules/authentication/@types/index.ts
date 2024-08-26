export interface User {
  id: number;
  slug: string;
  username: string;
  email: string;
  date_joined: string;
  updated_at: string;
}

export type CreateUserResponse = User;

export type VerifyTokenResponse = object;

export type RefreshTokenResponse = {
  access: string;
};

export type ObtainPairTokenResponse = {
  user: User;
  refresh: string;
  access: string;
};

export interface AuthenticationState {
  user: User | null;
  refresh: string | null;
  access: string | null;
  authenticationStatus: "authenticated" | "notAuthenticated";
}

export interface StoredAuthenticationState {
  user: User;
  refresh: string | null;
  access: string;
}
