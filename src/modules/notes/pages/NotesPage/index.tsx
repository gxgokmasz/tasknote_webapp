import { FoldersScrollArea } from "../../components/FoldersScrollArea";
import { NotesScrollArea } from "../../components/NotesScrollArea";
import * as Styled from "./styles";

export const NotesPage = () => {
  return (
    <Styled.NotesPageContainer>
      <Styled.Wrapper>
        <Styled.FoldersContainer>
          <FoldersScrollArea />
        </Styled.FoldersContainer>
        <Styled.NotesContainer>
          <NotesScrollArea />
        </Styled.NotesContainer>
      </Styled.Wrapper>
    </Styled.NotesPageContainer>
  );
};
