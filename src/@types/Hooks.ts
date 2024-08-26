export interface StoreHookOptions {
  onlyActions?: boolean;
  onlyStates?: boolean;
}

export type StoreHookResponse<O extends StoreHookOptions, S, A> = O["onlyActions"] extends true
  ? A
  : O["onlyStates"] extends true
  ? S
  : [S, A];
