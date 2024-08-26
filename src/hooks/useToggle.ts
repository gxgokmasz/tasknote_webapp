import { useState } from "react";

export const useToggle = (initialValue: boolean) => {
  const [value, setValue] = useState(initialValue);

  const invertValue = () => {
    setValue(!value);
  };

  return [value, invertValue] as [boolean, () => void];
};
