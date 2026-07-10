import {
  Modal as CModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';
import React from 'react';

const Modal = ({ title, showFooter, children, ...props }) => {
  const { onClose } = props;
  return (
    <>
      <CModal {...props}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>{title}</ModalHeader>
            <ModalBody>{children}</ModalBody>
            {onClose && <ModalCloseButton />}

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
