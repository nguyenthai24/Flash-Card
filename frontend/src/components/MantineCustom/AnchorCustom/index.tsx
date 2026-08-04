// components/MantineCustom/AnchorCustom.tsx

'use client';

import Link, { LinkProps } from 'next/link';
import styled from 'styled-components';
import { ReactNode } from 'react';
import { StyledAnchor } from './styled';

interface AnchorCustomProps extends LinkProps {
  children: ReactNode;
}

export default function AnchorCustom({ children, ...props }: AnchorCustomProps) {
  return <StyledAnchor {...props}>{children}</StyledAnchor>;
}
