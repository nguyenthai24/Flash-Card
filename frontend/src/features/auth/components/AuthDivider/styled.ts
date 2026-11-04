import styled from 'styled-components';
import { muted } from '../../common/tokens';

export const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${muted};
  font-size: 13px;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-top: 1px dashed #c8c0ab;
  }
`;
