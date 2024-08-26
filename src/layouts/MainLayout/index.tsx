import { Outlet } from "react-router-dom";

import { Header } from "../../components/Header";
import * as Styled from "./styles";

export const MainLayout = () => {
  return (
    <Styled.MainLayoutContainer>
      <Styled.Cover>
        <Header />

        <Styled.OutletContainer>
          <Outlet />
        </Styled.OutletContainer>
      </Styled.Cover>
    </Styled.MainLayoutContainer>
  );
};
