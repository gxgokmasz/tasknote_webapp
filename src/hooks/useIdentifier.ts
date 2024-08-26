import { useId } from "react";

export const useIdentifier = (names: string[]) => {
  const idHash = useId();

  const idNames: string[] = [];

  for (const name in names) {
    const newId = `${idHash}-${name}`;
    idNames.push(newId);
  }

  return idNames;
};
