import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/core';

import styles from './nav.module.css';

export const NavItem = ({ children, active = false, ...props }) => (
  <Box mx={1}>
    <div>
      <Box px={3} py={1} textDecoration={active ? 'underline' : ''} _hover={{ color: 'brand.100' }} {...props}>
        {children}
      </Box>
    </div>
  </Box>
);

export const NavBlock = ({ navItems, level = 0 }) => {
  const [isOpen, setOpen] = useState(false);
  const { pathname } = useLocation();
  return navItems.map((i) => {
    const { items, url, name } = i;
    const key = `${url}-${name}`;
    console.log(styles);
    if (typeof items != 'undefined') {
      return (
        <Box key={key} className={styles.navBlock} position={'relative'}>
          <Nav.Item as={'div'}>{name}</Nav.Item>
          <Box
            className={styles.navBlockInner}
            position={'absolute'}
            boxShadow={'0px 0px 5px 0px rgba(0,0,0,0.75)'}
            padding={2}
            bg="brand.600"
            color="white"
          >
            <NavBlock navItems={items} level={level + 1} />
          </Box>
        </Box>
      );
    }

    return (
      <Nav.Item className={styles.navItem} as={Link} key={key} active={pathname.startsWith(url)} to={url}>
        {name}
      </Nav.Item>
    );
  });
};

const Nav = ({ children, ...props }) => (
  <Flex as="nav" align="center" padding={2} bg="brand.600" color="white" {...props}>
    {children}
  </Flex>
);

Nav.Item = NavItem;
Nav.Block = NavBlock;

export default Nav;
