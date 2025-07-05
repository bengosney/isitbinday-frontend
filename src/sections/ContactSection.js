import { Box, Heading, Text, Link, VStack } from '@chakra-ui/react';
import React from 'react';

const ContactSection = () => (
  <Box maxW="600px" margin="auto" p={8}>
    <VStack spacing={4} align="start">
      <Heading as="h1" size="lg">
        Contact Us
      </Heading>
      <Text>If you have any questions, feedback, or need support, please reach out:</Text>
      <Text>
        Email:{' '}
        <Link href="mailto:support@isitbinday.com" color="teal.500">
          support@isitbinday.com
        </Link>
      </Text>
    </VStack>
  </Box>
);

export default ContactSection;
