import { Box, Container, Flex } from '@mantine/core';
import { theme } from '~/constants';

import HeaderLogo from './HeaderLogo';
import HeaderNavigation from './HeaderNavigation';
import HeaderAction from './HeaderAction';
import { Wrapper } from './styled';
import MobileHeaderNavigation from './MobileHeaderNavigation';

export default function Header() {
  return (
    <Wrapper>
      <Container w="100%" pos="relative">
        <Flex h="100%" align="center" justify="space-between">
          <Flex align="center" gap={42}>
            <HeaderLogo />

            <Flex visibleFrom="sm">
              <HeaderNavigation />
            </Flex>

            <Flex hiddenFrom="sm">
              <MobileHeaderNavigation />
            </Flex>
          </Flex>

          <HeaderAction />
        </Flex>
      </Container>
    </Wrapper>
  );
}
