import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import React from 'react';

const ErrorMessage = ({ title, message, show = true, ...props }) => {
  const empty = (value) => typeof value == 'undefined' || ['', 'undefined'].indexOf(`${value}`) !== -1;

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
    <Alert status="error" {...props}>
      <AlertIcon />
      {!empty(title) ? <AlertTitle>{title}</AlertTitle> : null}
      <AlertDescription>{messageElement}</AlertDescription>
    </Alert>
  );
};

export default ErrorMessage;
