'use client';

import styled from 'styled-components';
import login_bg from '~/assets/images/login_bg.png';

export const Wrapper = styled.div`
  height: 100vh;
  background-image: url(${login_bg.src});
  background-size: cover;
  background-position: center;
  display: flex;
`;

export const Content = styled.div`
  box-shadow: ${(props) => props.theme.shadows.SHADOW};
  margin: auto;
  border-radius: 1.6rem;
  background: ${(props) => props.theme.colors.BACKGROUND_PRIMARY};
  padding: 1.6rem;
  width: 368px;
  max-width: calc(100% - 32px);
  z-index: 200;
  position: relative;
`;
