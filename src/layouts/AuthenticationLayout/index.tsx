import { Outlet } from "react-router-dom";

import * as Styled from "./styles";

export const AuthenticationLayout = () => {
  return (
    <Styled.AuthenticationLayoutContainer>
      <Styled.Cover>
        <Styled.OutletContainer>
          <Outlet />
        </Styled.OutletContainer>

        <Styled.AnimationLineContainer>
          <Styled.AnimatedLine />
          <Styled.AnimatedLine />
          <Styled.AnimatedLine />
          <Styled.AnimatedLine />
        </Styled.AnimationLineContainer>
      </Styled.Cover>
    </Styled.AuthenticationLayoutContainer>
  );
};
