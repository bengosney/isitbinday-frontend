import { Link } from '@chakra-ui/react';
import Linkify from 'linkify-react';
import React from 'react';

const renderLink = ({ attributes, content }) => {
  const { href, ...props } = attributes;
  return (
    <Link href={href} textDecoration="underline dotted" _hover={{ textDecoration: 'underline' }} {...props}>
      {content}
    </Link>
  );
};

const LinkifyText = ({ children }) => (
  <Linkify options={{ target: '_blank', rel: 'noopener noreferrer', render: renderLink }}>{children}</Linkify>
);

export default LinkifyText;
