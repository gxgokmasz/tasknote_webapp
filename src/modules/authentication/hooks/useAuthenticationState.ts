import { useMemo } from "react";
import { toast } from "react-toastify";

import { StoreHookOptions, StoreHookResponse } from "../../../@types/Hooks";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  loadFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage,
} from "../../../utils/localStorage";
import { setActiveFolderAction, setActiveNoteAction } from "../../notes/reducers";
import {
  AuthenticationState,
  ObtainPairTokenResponse,
  StoredAuthenticationState,
} from "../@types";
import { authenticateAction, signOutAction } from "../reducers";
import { refreshAccess, verifyToken } from "../services";

const LOCAL_STORAGE_AUTHENTICATION_ACCESS = import.meta.env
  .VITE_LOCAL_STORAGE_AUTHENTICATION_ACCESS as string;
const LOCAL_STORAGE_NOTES_DATA = import.meta.env.VITE_LOCAL_STORAGE_NOTES_DATA as string;

interface AuthenticationActions {
  executeSignIn: (data: ObtainPairTokenResponse, rememberMe?: boolean) => void;
  handleSignOut: () => void;
  executeInitialAuthenticationVerification: () => Promise<void>;
}

const useAuthenticationActions = () => {
  const dispatch = useAppDispatch();

  const updateAuthenticationStateLocalStorage = (data: StoredAuthenticationState) => {
    saveToLocalStorage<StoredAuthenticationState>(LOCAL_STORAGE_AUTHENTICATION_ACCESS, data);
  };

  const raiseAuthenticationExpired = () => {
    removeFromLocalStorage(LOCAL_STORAGE_AUTHENTICATION_ACCESS);
    removeFromLocalStorage(LOCAL_STORAGE_NOTES_DATA);

    toast.error("Sua sessão expirou, entre novamente para acessar!");
  };

  const actions: AuthenticationActions = useMemo(
    () => ({
      executeSignIn: (data, rememberMe) => {
        const authenticationData = {
          user: data.user,
          refresh: rememberMe ? data.refresh : null,
          access: data.access,
        };
        dispatch(authenticateAction(authenticationData));
        updateAuthenticationStateLocalStorage(authenticationData);
      },
      handleSignOut: () => {
        dispatch(signOutAction());
        dispatch(setActiveFolderAction(null));
        dispatch(setActiveNoteAction(null));
        removeFromLocalStorage(LOCAL_STORAGE_AUTHENTICATION_ACCESS);
        removeFromLocalStorage(LOCAL_STORAGE_NOTES_DATA);
      },
      executeInitialAuthenticationVerification: async () => {
        const storedAuthenticationState = loadFromLocalStorage<StoredAuthenticationState>(
          LOCAL_STORAGE_AUTHENTICATION_ACCESS
        );

        if (!storedAuthenticationState) {
          dispatch(signOutAction());
          dispatch(setActiveFolderAction(null));
          dispatch(setActiveNoteAction(null));
          removeFromLocalStorage(LOCAL_STORAGE_NOTES_DATA);

          return;
        }

        const { user, refresh, access } = storedAuthenticationState;
        const verifyAccessResponse = await verifyToken(access);

        if (verifyAccessResponse.data) {
          dispatch(authenticateAction(storedAuthenticationState));

          return;
        }

        if (!refresh) {
          dispatch(signOutAction());
          dispatch(setActiveFolderAction(null));
          dispatch(setActiveNoteAction(null));
          raiseAuthenticationExpired();

          return;
        }

        const verifyRefreshResponse = await verifyToken(refresh);

        if (!verifyRefreshResponse.data) {
          dispatch(signOutAction());
          dispatch(setActiveFolderAction(null));
          dispatch(setActiveNoteAction(null));
          raiseAuthenticationExpired();

          return;
        }

        const refreshResponse = await refreshAccess(refresh);
        const newAcessToken = refreshResponse.data!.access;
        const newAuthenticationData = { user, refresh, access: newAcessToken };
        dispatch(authenticateAction(newAuthenticationData));
        updateAuthenticationStateLocalStorage(newAuthenticationData);
      },
    }),
    [dispatch]
  );

  return actions;
};

export const useAuthenticationState = <O extends StoreHookOptions>(options?: O) => {
  const state = useAppSelector((state) => state.authentication);
  const actions = useAuthenticationActions();

  const shouldReturnOnlyActions = options?.onlyActions ?? false;
  const shouldReturnOnlyState = options?.onlyStates ?? false;

  if (shouldReturnOnlyActions) {
    return { ...actions } as StoreHookResponse<O, AuthenticationState, AuthenticationActions>;
  }

  if (shouldReturnOnlyState) {
    return { ...state } as StoreHookResponse<O, AuthenticationState, AuthenticationActions>;
  }

  return [{ ...state }, { ...actions }] as StoreHookResponse<
    O,
    AuthenticationState,
    AuthenticationActions
  >;
};
