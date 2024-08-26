import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

import { StoredAuthenticationState } from "../modules/authentication/@types";
import { loadFromLocalStorage } from "../utils/localStorage";

interface ApiProps {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  data?: object;
  params?: object;
  withAuth?: boolean;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
const LOCAL_STORAGE_AUTHENTICATION_ACCESS = import.meta.env
  .VITE_LOCAL_STORAGE_AUTHENTICATION_ACCESS as string;

export interface ErrorResponse {
  [key: string]: string | string[];
}

export const api = async <ResponseType>({
  url,
  data,
  params,
  method = "GET",
  withAuth = true,
}: ApiProps) => {
  const accessToken = loadFromLocalStorage<StoredAuthenticationState>(
    LOCAL_STORAGE_AUTHENTICATION_ACCESS
  )?.access as string;

  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      Authorization: withAuth && `Bearer ${accessToken}`,
    },
  });

  try {
    const response = await instance<ResponseType>({
      method,
      url,
      data,
      params,
    });

    return {
      data: response.data,
      status: response.status,
    };
  } catch (e) {
    const error = e as AxiosError<ErrorResponse>;

    if (error.message == "Network Error") {
      toast.error("Erro interno do sistema!");
    }

    return {
      error: {
        description: error.message,
        data: error.response?.data ?? null,
      },
    };
  }
};
