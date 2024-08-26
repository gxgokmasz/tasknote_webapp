import styled, { keyframes } from "styled-components";

const rotatePlus = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const rotateMinus = keyframes`
  0% {
    transform: rotate(360deg);
  }

  100% {
    transform: rotate(0deg);
  } 
`;

export const AuthenticationLayoutContainer = styled.div`
  display: flex;
  justify-content: center;

  background-color: ${({ theme }) => theme.COLORS["amber-200"]};

  min-height: 100dvh;
`;

export const Cover = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;
  border-top-right-radius: 40%;
  border-bottom-left-radius: 40%;
  background-color: ${({ theme }) => theme.COLORS["amber-950"]};

  width: 100%;
  max-width: 96rem;
`;

export const OutletContainer = styled.div`
  position: absolute;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
  width: 100%;
`;

export const AnimationLineContainer = styled.div`
  position: relative;

  width: 50rem;
  height: 50rem;
`;

export const AnimatedLine = styled.div`
  position: absolute;
  inset: 0;

  border: 2px solid ${({ theme }) => theme.COLORS.white};

  transition: all 0.5s;

  &:nth-child(1) {
    border: 6px solid ${({ theme }) => theme.COLORS["red-500"]};

    filter: drop-shadow(0 0 20px ${({ theme }) => theme.COLORS["red-500"]});

    border-radius: 38% 62% 63% 37% / 41% 44% 56% 59%;

    animation: ${rotatePlus} 6s linear infinite;
  }

  &:nth-child(2) {
    border: 6px solid ${({ theme }) => theme.COLORS["orange-500"]};

    filter: drop-shadow(0 0 20px ${({ theme }) => theme.COLORS["orange-500"]});

    border-radius: 41% 44% 56% 59%/38% 62% 63% 37%;

    animation: ${rotateMinus} 4s linear infinite;
  }

  &:nth-child(3) {
    border: 6px solid ${({ theme }) => theme.COLORS["amber-500"]};

    filter: drop-shadow(0 0 20px ${({ theme }) => theme.COLORS["amber-500"]});

    border-radius: 41% 44% 56% 59%/38% 62% 63% 37%;

    animation: ${rotatePlus} 10s linear infinite;
  }

  &:nth-child(4) {
    border: 6px solid ${({ theme }) => theme.COLORS["yellow-500"]};

    filter: drop-shadow(0 0 20px ${({ theme }) => theme.COLORS["yellow-500"]});

    border-radius: 41% 44% 56% 59%/38% 62% 63% 37%;

    animation: ${rotateMinus} 10s linear infinite;
  }
`;
