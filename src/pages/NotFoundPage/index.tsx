import { TbError404 } from "react-icons/tb";
import { useTheme } from "styled-components";

import * as Styled from "./styles";

export const NotFoundPage = () => {
  const theme = useTheme();

  return (
    <Styled.NotFoundPageContainer>
      <TbError404
        color={theme.COLORS["amber-950"]}
        size={200}
      />

      <Styled.Link to="/">Voltar à página inicial</Styled.Link>
    </Styled.NotFoundPageContainer>
  );
};
