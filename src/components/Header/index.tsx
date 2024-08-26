import { TbDoorEnter } from "react-icons/tb";

import { useAuthenticationState } from "../../modules/authentication/hooks/useAuthenticationState";
import * as Styled from "./styles";

const logoUrl = new URL("../../assets/logo.png", import.meta.url).href;

export const Header = () => {
  const { handleSignOut } = useAuthenticationState({ onlyActions: true });

  return (
    <Styled.HeaderContainer>
      <Styled.Logo
        src={logoUrl}
        alt="Tasknote Logo"
      />

      <Styled.SignOutButton
        title="Sair"
        onClick={handleSignOut}
      >
        <TbDoorEnter size={24} />
      </Styled.SignOutButton>
    </Styled.HeaderContainer>
  );
};
