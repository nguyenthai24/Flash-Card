import { keyframes } from 'styled-components';

export const scaleIn = keyframes`
  to {
    transform: scale(1.1);
  }
`;

export const scaleOut = keyframes`
  from {
    transform: scale(1.1);
  }
  to {
    transform: scale(1);
  }
`;

export const scaleInV2 = keyframes`
  to {
    transform: scale(1.1) rotate(1deg);
  }
`;

export const scaleOutV2 = keyframes`
  from {
    transform: scale(1.1) rotate(1deg);
  }
  to {
    transform: scale(1) rotate(0deg);
  }
`;

export const slideIn = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0%);
  }
`;

export const slideOut = keyframes`
  from {
    transform: translateY(0%);
  }
  to {
    transform: translateY(100%);
  }
`;

export const textScaleIn = keyframes`
  from {
   font-size: 1.6rem;
  }
  to {
   font-size: 1.9rem;
  }
`;

export const textScaleOut = keyframes`
  from {
    font-size: 1.9rem;
  }
  to {
    font-size: 1.6rem;
  }
`;
