import { Alert, type AlertRootProps } from '@chakra-ui/react';
import React from 'react';

interface ErrorMessageProps extends Omit<AlertRootProps, 'status' | 'title'> {
  title?: React.ReactNode;
  message?: string | string[];
  show?: boolean;
}

const ErrorMessage = ({ title, message, show = true, ...props }: ErrorMessageProps) => {
  const empty = (value: unknown) => typeof value == 'undefined' || ['', 'undefined'].indexOf(`${value}`) !== -1;

  if (!show || empty(message)) {
    return null;
  }

  const messageElement = Array.isArray(message) ? (
    <ul>
      {message.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  ) : (
    <p>{message}</p>
  );

  return (
    <Alert.Root status="error" {...props}>
      <Alert.Indicator />
      {!empty(title) ? <Alert.Title>{title}</Alert.Title> : null}
      <Alert.Description>{messageElement}</Alert.Description>
    </Alert.Root>
  );
};

export default ErrorMessage;
