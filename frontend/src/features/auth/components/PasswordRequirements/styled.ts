import styled from 'styled-components';
import { muted, accent, accentDark } from '../../common/tokens';

export const Strength = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4px;
`;

export const StrengthBar = styled.span<{ $on: boolean }>`
  height: 5px;
  border-radius: 3px;
  background: ${({ $on }) => ($on ? accent : '#e4dfcf')};
`;

export const Requirements = styled.ul`
  display: grid;
  gap: 4px;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 13px;
`;

export const Requirement = styled.li<{ $met: boolean }>`
  color: ${({ $met }) => ($met ? accentDark : muted)};
  font-weight: ${({ $met }) => ($met ? 600 : 400)};
`;
