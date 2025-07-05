import usePageTitle from '../utils/usePageTitle';
import MaxWidth from '../widgets/MaxWidth';
import { Box, Heading, Text, Link, List, ListItem, UnorderedList } from '@chakra-ui/react';
import React from 'react';

const PrivacyPolicySection = () => {
  usePageTitle('Privacy Policy');
  return (
    <MaxWidth maxWidth="800px" py={8}>
      <Heading as="h1" size="xl" textAlign="center" mb={6}>
        Privacy Policy for IsItBinDay
      </Heading>
      <Text as="em" display="block" mb={4}>
        Last updated: July 5, 2025
      </Text>
      <Text mb={4}>
        This Privacy Policy describes how IsItBinDay ("we," "us," or "our") collects, uses, and discloses your personal
        information when you use our website{' '}
        <Link href="https://www.isitbinday.com" color="blue.500" isExternal>
          www.isitbinday.com
        </Link>{' '}
        (the "Service") and when you sign up for an account.
      </Text>
      <Text mb={4}>
        By accessing or using our Service, you agree to the collection and use of information in accordance with this
        Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not use our Service.
      </Text>
      <Heading as="h2" size="lg" mt={8} mb={2}>
        1. Information We Collect
      </Heading>
      <Text mb={2}>
        We collect several different types of information for various purposes to provide and improve our Service to
        you.
      </Text>
      <Heading as="h3" size="md" mt={6} mb={2}>
        a. Personal Information You Provide
      </Heading>
      <Text mb={2}>
        When you sign up for an account on our Service, we may ask you to provide us with certain personally
        identifiable information that can be used to contact or identify you ("<strong>Personal Data</strong>"). This
        may include, but is not limited to:
      </Text>
      <UnorderedList mb={2} pl={6}>
        <ListItem>
          <strong>Email address:</strong> Used for account verification, password resets, and sending important updates
          about your account or the Service.
        </ListItem>
        <ListItem>
          <strong>Username:</strong> Used for login purposes and to identify your account.
        </ListItem>
        <ListItem>
          <strong>Password:</strong> Stored in an encrypted format for account security. We do not have access to your
          raw password.
        </ListItem>
        <ListItem>
          <strong>[Optional, based on future features]:</strong> Any other information you choose to provide, such as
          dietary preferences or family size if these become part of a user profile.
        </ListItem>
      </UnorderedList>
      <Heading as="h3" size="md" mt={6} mb={2}>
        b. User-Generated Content
      </Heading>
      <Text mb={2}>As part of the IsItBinDay Service, you will create and store data. This includes:</Text>
      <UnorderedList mb={2} pl={6}>
        <ListItem>
          <strong>To-Do List Items:</strong> Tasks, notes, deadlines, and any other information you input into your
          to-do lists.
        </ListItem>
        <ListItem>
          <strong>Recipes:</strong> Ingredients, instructions, notes, and any other details you add to your personal
          recipe collection.
        </ListItem>
        <ListItem>
          <strong>[Potentially, if you add this]:</strong> Meal plans, shopping lists generated from recipes, or other
          similar content.
        </ListItem>
      </UnorderedList>
      <Text mb={2}>This content is linked to your user account and is considered your Personal Data.</Text>
      <Heading as="h3" size="md" mt={6} mb={2}>
        c. Usage Data
      </Heading>
      <Text mb={2}>
        We may also collect information that your browser sends whenever you visit our Service or when you access the
        Service by or through a mobile device ("<strong>Usage Data</strong>"). This Usage Data may include information
        such as:
      </Text>
      <UnorderedList mb={2} pl={6}>
        <ListItem>Your computer's Internet Protocol address (e.g., IP address)</ListItem>
        <ListItem>Browser type and version</ListItem>
        <ListItem>The pages of our Service that you visit</ListItem>
        <ListItem>The time and date of your visit</ListItem>
        <ListItem>The time spent on those pages</ListItem>
        <ListItem>Unique device identifiers</ListItem>
        <ListItem>Other diagnostic data</ListItem>
      </UnorderedList>
      <Heading as="h3" size="md" mt={6} mb={2}>
        d. Tracking & Cookies Data
      </Heading>
      <Text mb={2}>
        We use cookies and similar tracking technologies to track the activity on our Service and hold certain
        information.
      </Text>
      <Text mb={2}>
        <strong>Cookies</strong> are files with a small amount of data that may include an anonymous unique identifier.
        Cookies are sent to your browser from a website and stored on your device. Tracking technologies also used are
        beacons, tags, and scripts to collect and track information and to improve and analyze our Service.
      </Text>
      <Text mb={2}>
        You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you
        do not accept cookies, you may not be able to use some portions of our Service.
      </Text>
      <Text mb={2}>Examples of Cookies we use:</Text>
      <UnorderedList mb={2} pl={6}>
        <ListItem>
          <strong>Session Cookies:</strong> We use Session Cookies to operate our Service.
        </ListItem>
        <ListItem>
          <strong>Preference Cookies:</strong> We use Preference Cookies to remember your preferences (e.g., display
          settings, theme) and various settings.
        </ListItem>
        <ListItem>
          <strong>Security Cookies:</strong> We use Security Cookies for security purposes.
        </ListItem>
      </UnorderedList>
      <Heading as="h2" size="lg" mt={8} mb={2}>
        2. How We Use Your Information
      </Heading>
      <Text mb={2}>IsItBinDay uses the collected data for various purposes:</Text>
      <UnorderedList mb={2} pl={6}>
        <ListItem>
          To provide and maintain our Service: This includes enabling user accounts, allowing you to create and manage
          to-do lists and recipes, and ensuring the proper functioning of the website.
        </ListItem>
        <ListItem>
          To personalize your experience: To display your personal to-do lists and recipe collections.
        </ListItem>
        <ListItem>
          To notify you about changes to our Service: Such as updates to our terms of service or privacy policy.
        </ListItem>
        <ListItem>
          To provide customer support: To respond to your inquiries and resolve issues related to your account or the
          Service.
        </ListItem>
        <ListItem>
          To monitor the usage of our Service: To analyze trends, track user activity, and gather anonymous demographic
          information to improve our features.
        </ListItem>
        <ListItem>
          To detect, prevent, and address technical issues: Ensuring the security and stability of our platform.
        </ListItem>
        <ListItem>
          [Optional, if you plan to]: To send you marketing and promotional communications about new features or
          services on IsItBinDay (with your consent, if required by law). You can opt-out of receiving these
          communications at any time.
        </ListItem>
      </UnorderedList>
      <Heading as="h2" size="lg" mt={8} mb={2}>
        3. Disclosure Of Your Information
      </Heading>
      <Text mb={2}>We may share your personal information in the following situations:</Text>
      <UnorderedList mb={2} pl={6}>
        <ListItem>
          <strong>With Service Providers:</strong> We may employ third-party companies and individuals to facilitate our
          Service ("<strong>Service Providers</strong>"), to provide the Service on our behalf, to perform
          Service-related services (e.g., database hosting, analytics, email delivery), or to assist us in analyzing how
          our Service is used. These third parties have access to your Personal Data only to perform these tasks on our
          behalf and are obligated not to disclose or use it for any other purpose.
          <UnorderedList pl={6}>
            <ListItem>
              <em>Examples of Service Providers may include:</em> hosting providers (e.g., AWS, Google Cloud), analytics
              providers (e.g., Google Analytics), email service providers.
            </ListItem>
          </UnorderedList>
        </ListItem>
        <ListItem>
          <strong>For Business Transfers:</strong> If we are involved in a merger, acquisition, or asset sale, your
          Personal Data may be transferred. We will provide notice before your Personal Data is transferred and becomes
          subject to a different Privacy Policy.
        </ListItem>
        <ListItem>
          <strong>For Legal Requirements:</strong> We may disclose your Personal Data in the good faith belief that such
          action is necessary to:
          <UnorderedList pl={6}>
            <ListItem>Comply with a legal obligation (e.g., a court order or subpoena).</ListItem>
            <ListItem>Protect and defend the rights or property of IsItBinDay.</ListItem>
            <ListItem>Prevent or investigate possible wrongdoing in connection with the Service.</ListItem>
            <ListItem>Protect the personal safety of users of the Service or the public.</ListItem>
            <ListItem>Protect against legal liability.</ListItem>
          </UnorderedList>
        </ListItem>
        <ListItem>
          <strong>With Your Consent:</strong> We may disclose your personal information for any other purpose with your
          explicit consent.
        </ListItem>
      </UnorderedList>
      <Text mb={2} fontWeight="bold">
        We will never sell your personal data or user-generated content (your to-do lists or recipes) to third parties.
      </Text>
      <Heading as="h2" size="lg" mt={8} mb={2}>
        4. Security Of Your Information
      </Heading>
      <Text mb={2}>
        The security of your data is important to us, but remember that no method of transmission over the Internet, or
        method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect
        your Personal Data, we cannot guarantee its absolute security.
      </Text>
      <Heading as="h2" size="lg" mt={8} mb={2}>
        5. Your Data Protection Rights
      </Heading>
      <Text mb={2}>Depending on your location, you may have the following data protection rights:</Text>
      <UnorderedList mb={2} pl={6}>
        <ListItem>
          <strong>The right to access:</strong> You have the right to request copies of your personal data.
        </ListItem>
        <ListItem>
          <strong>The right to rectification:</strong> You have the right to request that we correct any information you
          believe is inaccurate or complete information you believe is incomplete.
        </ListItem>
        <ListItem>
          <strong>The right to erasure:</strong> You have the right to request that we erase your personal data, under
          certain conditions.
        </ListItem>
        <ListItem>
          <strong>The right to restrict processing:</strong> You have the right to request that we restrict the
          processing of your personal data, under certain conditions.
        </ListItem>
        <ListItem>
          <strong>The right to object to processing:</strong> You have the right to object to our processing of your
          personal data, under certain conditions.
        </ListItem>
        <ListItem>
          <strong>The right to data portability:</strong> You have the right to request that we transfer the data that
          we have collected to another organization, or directly to you, under certain conditions.
        </ListItem>
        <ListItem>
          <strong>The right to withdraw consent:</strong> You also have the right to withdraw your consent at any time
          where IsItBinDay relied on your consent to process your personal information.
        </ListItem>
      </UnorderedList>
      <Text mb={2}>
        If you make a request, we have one month to respond to you. If you would like to exercise any of these rights,
        please contact us at{' '}
        <Link href="mailto:privacy@isitbinday.com" color="blue.500">
          privacy@isitbinday.com
        </Link>
        .
      </Text>
      <Heading as="h2" size="lg" mt={8} mb={2}>
        6. Links To Other Sites
      </Heading>
      <Text mb={2}>
        Our Service may contain links to other sites that are not operated by us. If you click on a third-party link,
        you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every
        site you visit.
      </Text>
      <Text mb={2}>
        We have no control over and assume no responsibility for the content, privacy policies, or practices of any
        third-party sites or services.
      </Text>
      <Heading as="h2" size="lg" mt={8} mb={2}>
        7. Children's Privacy
      </Heading>
      <Text mb={2}>
        Our Service does not address anyone under the age of 13 ("<strong>Children</strong>").
      </Text>
      <Text mb={2}>
        We do not knowingly collect personally identifiable information from anyone under the age of 13. If you are a
        parent or guardian and you are aware that your Children have provided us with Personal Data, please contact us.
        If we become aware that we have collected Personal Data from children without verification of parental consent,
        we take steps to remove that information from our servers.
      </Text>
      <Heading as="h2" size="lg" mt={8} mb={2}>
        8. Changes To This Privacy Policy
      </Heading>
      <Text mb={2}>
        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy
        Policy on this page.
      </Text>
      <Text mb={2}>
        We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective
        and update the "last updated" date at the top of this Privacy Policy.
      </Text>
      <Text mb={2}>
        You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are
        effective when they are posted on this page.
      </Text>
      <Heading as="h2" size="lg" mt={8} mb={2}>
        9. Contact Us
      </Heading>
      <Text mb={2}>If you have any questions about this Privacy Policy, please contact us:</Text>
      <UnorderedList mb={2} pl={6}>
        <ListItem>
          By email:{' '}
          <Link href="mailto:privacy@isitbinday.com" color="blue.500">
            privacy@isitbinday.com
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

export default PrivacyPolicySection;
