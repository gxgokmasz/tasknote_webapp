import { useEffect, useRef, useState } from "react";

interface AsyncAction {
  callback: (...parms: []) => Promise<void>;
  params: [];
}

export const useLoading = (asyncActions: AsyncAction[]) => {
  const [isLoading, setIsLoading] = useState(true);
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (hasLoaded.current) return;

    const awaitPromises = async () => {
      await Promise.all(
        asyncActions.map(async ({ callback, params }) => {
          await callback(...params);
        })
      );

      setIsLoading(false);
    };

    awaitPromises();
    hasLoaded.current = true;
  }, [asyncActions]);

  return isLoading;
};
