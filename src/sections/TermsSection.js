import usePageTitle from '../utils/usePageTitle';
import MaxWidth from '../widgets/MaxWidth';
import { Heading, Text, Link, UnorderedList, ListItem } from '@chakra-ui/react';
import React from 'react';

const TermsSection = () => {
  usePageTitle('Terms and Conditions');
  return (
    <MaxWidth maxWidth="800px" py={8}>
      <Heading as="h1" size="xl" textAlign="center" mb={6}>
        Terms and Conditions for IsItBinDay
      </Heading>
      <Text mb={4}>
        Please read these Terms and Conditions ("Terms," "Terms and Conditions") carefully before using the IsItBinDay
        website (the "Service") operated by IsItBinDay ("us," "we," or "our").
      </Text>
      <Text mb={4}>
        Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms.
        These Terms apply to all visitors, users, and others who access or use the Service.
      </Text>
      <Text mb={4}>
        By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the
        terms, then you may not access the Service.
      </Text>
      <Heading as="h2" size="lg" mt={8} mb={2}>
        1. Accounts
      </Heading>
      <Text mb={2}>
        When you create an account with us, you must provide us with information that is{' '}
        <strong>accurate, complete, and current</strong> at all times. Failure to do so constitutes a breach of the
        Terms, which may result in immediate termination of your account on our Service.
      </Text>
      <Text mb={2}>
        You are responsible for safeguarding the password that you use to access the Service and for any activities or
        actions under your password, whether your password is with our Service or a third-party service.
      </Text>
      <Text mb={2}>
        You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware
        of any breach of security or unauthorized use of your account.
      </Text>
      <Text mb={2}>
        You may not use as a username the name of another person or entity or that is not lawfully available for use, a
        name or trademark that is subject to any rights of another person or entity other than you without appropriate
        authorization, or a name that is otherwise offensive, vulgar, or obscene.
      </Text>
      <Heading as="h2" size="lg" mt={8} mb={2}>
        2. Intellectual Property
      </Heading>
      <Text mb={2}>
        The Service and its original content (excluding content provided by users), features, and functionality are and
        will remain the exclusive property of IsItBinDay and its licensors. The Service is protected by copyright,
        trademark, and other laws of both the <strong>United Kingdom</strong> and foreign countries. Our trademarks and
        trade dress may not be used in connection with any product or service without the prior written consent of
        IsItBinDay.
      </Text>
      <Heading as="h2" size="lg" mt={8} mb={2}>
        3. User-Generated Content
      </Heading>
      <Text mb={2}>
        IsItBinDay allows you to create, store, and manage to-do list items and recipes ("<strong>Your Content</strong>
        "). You are solely responsible for Your Content that you store on or through the Service, including its
        legality, reliability, and appropriateness.
      </Text>
      <Text mb={2}>
        By storing Your Content on the Service, you grant IsItBinDay a non-exclusive, worldwide, royalty-free license to
        use, reproduce, adapt, publish, and distribute Your Content{' '}
        <strong>solely for the purpose of providing and improving the Service to you</strong>. You retain any and all of
        your rights to any Content you submit, store, or display on or through the Service and you are responsible for
        protecting those rights.
      </Text>
      <Text mb={2}>
        You represent and warrant that: (i) Your Content is yours (you own it) or you have the right to use it and grant
        us the rights and license as provided in these Terms, and (ii) the storage or use of Your Content on or through
        the Service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other
        rights of any person.
      </Text>
      <Text mb={2}>
        We reserve the right to remove any Content that violates these Terms or is otherwise objectionable, at our sole
        discretion.
      </Text>
      <Heading as="h2" size="lg" mt={8} mb={2}>
        4. Acceptable Use
      </Heading>
      <Text mb={2}>
        You agree to use IsItBinDay for lawful purposes only and in a way that does not infringe the rights of, restrict
        or inhibit anyone else's use and enjoyment of the Service. Prohibited behavior includes harassing or causing
        distress or inconvenience to any other user, transmitting obscene or offensive content, or disrupting the normal
        flow of dialogue within our Service.
      </Text>
      <Heading as="h2" size="lg" mt={8} mb={2}>
        5. Links To Other Web Sites
      </Heading>
      <Text mb={2}>
        Our Service may contain links to third-party web sites or services that are not owned or controlled by
        IsItBinDay.
      </Text>
      <Text mb={2}>
        IsItBinDay has no control over, and assumes no responsibility for, the content, privacy policies, or practices
        of any third-party web sites or services. You further acknowledge and agree that IsItBinDay shall not be
        responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in
        connection with use of or reliance on any such content, goods, or services available on or through any such web
        sites or services.
      </Text>
      <Text mb={2}>
        We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites or
        services that you visit.
      </Text>
      <Heading as="h2" size="lg" mt={8} mb={2}>
        6. Termination
      </Heading>
      <Text mb={2}>
        We may terminate or suspend your account immediately, without prior notice or liability, for any reason
        whatsoever, including without limitation if you breach the Terms.
      </Text>
      <Text mb={2}>
        Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account,
        you may simply discontinue using the Service and delete your account through the provided account settings (if
        available), or by contacting us at{' '}
        <Link href="mailto:support@isitbinday.com" color="blue.500">
          support@isitbinday.com
        </Link>
        .
      </Text>
      <Heading as="h2" size="lg" mt={8} mb={2}>
        7. Indemnification
      </Heading>
      <Text mb={2}>
        You agree to defend, indemnify, and hold harmless IsItBinDay and its licensee and licensors, and their
        employees, contractors, agents, officers, and directors, from and against any and all claims, damages,
        obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees),
        resulting from or arising out of a) your use and access of the Service, by you or any person using your account
        and password; b) a breach of these Terms, or c) Your Content stored on the Service.
      </Text>
      <Heading as="h2" size="lg" mt={8} mb={2}>
        8. Limitation Of Liability
      </Heading>
      <Text mb={2}>
        In no event shall IsItBinDay, nor its directors, employees, partners, agents, suppliers, or affiliates, be
        liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation,
        loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or
        inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any
        content obtained from the Service; and (iv) unauthorized access, use, or alteration of your transmissions or
        content, whether based on warranty, contract, tort (including negligence), or any other legal theory, whether or
        not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to
        have failed of its essential purpose.
      </Text>
      <Heading as="h2" size="lg" mt={8} mb={2}>
        9. Disclaimer
      </Heading>
      <Text mb={2}>
        Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis.
        The Service is provided without warranties of any kind, whether express or implied, including, but not limited
        to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of
        performance.
      </Text>
      <Text mb={2}>
        IsItBinDay does not warrant that a) the Service will function uninterrupted, secure, or available at any
        particular time or location; b) any errors or defects will be corrected; c) the Service is free of viruses or
        other harmful components; or d) the results of using the Service will meet your requirements.
      </Text>
      <Heading as="h2" size="lg" mt={8} mb={2}>
        10. Governing Law
      </Heading>
      <Text mb={2}>
        These Terms shall be governed and construed in accordance with the laws of the <strong>United Kingdom</strong>,
        without regard to its conflict of law provisions.
      </Text>
      <Text mb={2}>
        Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If
        any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of
        these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service,
        and supersede and replace any prior agreements we might have between us regarding the Service.
      </Text>
      <Heading as="h2" size="lg" mt={8} mb={2}>
        11. Changes To These Terms
      </Heading>
      <Text mb={2}>
        We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is
        material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes
        a material change will be determined at our sole discretion.
      </Text>
      <Text mb={2}>
        By continuing to access or use our Service after those revisions become effective, you agree to be bound by the
        revised terms. If you do not agree to the new terms, please stop using the Service.
      </Text>
      <Heading as="h2" size="lg" mt={8} mb={2}>
        12. Contact Us
      </Heading>
      <Text mb={2}>If you have any questions about these Terms, please contact us:</Text>
      <UnorderedList mb={2} pl={6}>
        <ListItem>
          By email:{' '}
          <Link href="mailto:support@isitbinday.com" color="blue.500">
            support@isitbinday.com
          </Link>
        </ListItem>
        <ListItem>
          By visiting this page on our website:{' '}
          <Link href="https://www.isitbinday.com/contact" color="blue.500" isExternal>
            www.isitbinday.com/contact
          </Link>
        </ListItem>
      </UnorderedList>
    </MaxWidth>
  );
};

export default TermsSection;
