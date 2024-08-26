import { api } from "../../../services";
import {
  CreateUserResponse,
  ObtainPairTokenResponse,
  RefreshTokenResponse,
  VerifyTokenResponse,
} from "../@types";

export const signUp = async (username: string, email: string, password: string) => {
  return await api<CreateUserResponse>({
    url: "authentication/signup/",
    method: "POST",
    data: { username, email, password },
    withAuth: false,
  });
};

export const signIn = async (username: string, password: string) => {
  return await api<ObtainPairTokenResponse>({
    url: "authentication/token/",
    method: "POST",
    data: { username, password },
    withAuth: false,
  });
};

export const refreshAccess = async (refresh: string) => {
  return await api<RefreshTokenResponse>({
    url: "authentication/token/refresh/",
    method: "POST",
    data: { refresh },
    withAuth: false,
  });
};

export const verifyToken = async (token: string) => {
  return await api<VerifyTokenResponse>({
    url: "authentication/token/verify/",
    method: "POST",
    data: { token },
    withAuth: false,
  });
};
