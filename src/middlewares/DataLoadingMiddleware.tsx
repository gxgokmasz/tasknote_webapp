import { MiddlewareBaseProps } from "../@types/Middlewares";
import { Loading } from "../components/Loading";
import { useLoading } from "../hooks/useLoading";
import { useNotesState } from "../modules/notes/hooks/useNotesState";

export const DataLoadingMiddleware = ({ children }: MiddlewareBaseProps) => {
  const { setNotesStateInitialData } = useNotesState({ onlyActions: true });
  const isNotesStateLoading = useLoading([{ callback: setNotesStateInitialData, params: [] }]);

  if (isNotesStateLoading) return <Loading />;

  return children;
};
