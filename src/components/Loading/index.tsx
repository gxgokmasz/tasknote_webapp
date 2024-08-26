import { ClockLoader } from "react-spinners";
import { useTheme } from "styled-components";

import * as Styled from "./styles";

export const Loading = () => {
  const theme = useTheme();

  return (
    <Styled.LoadingContainer>
      <ClockLoader color={theme.COLORS["amber-950"]} />

      <Styled.Label>Por favor aguarde...</Styled.Label>
    </Styled.LoadingContainer>
  );
};
