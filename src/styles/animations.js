import { keyframes } from 'emotion';

export const basicFadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 100;
  }
`;

export const basicFadeOut = keyframes`
  0% {
    opacity: 100;
  }

  100% {
    opacity: 0;
  }
`;
