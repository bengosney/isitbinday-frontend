import React from 'react';
import {
  Modal as CModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/core';

const Modal = ({ title,showFooter, children, ...props }) => {
  const { onClose } = props;
  return (
    <>
      <CModal {...props}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>{title}</ModalHeader>
            {onClose && <ModalCloseButton />}
            <ModalBody>{children}</ModalBody>

            <ModalFooter>
              {onClose && showFooter && (
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
              )}
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </CModal>
    </>
  );
};

export default Modal;
