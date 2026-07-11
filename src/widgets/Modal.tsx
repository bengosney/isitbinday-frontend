import useTokens from '../utils/useTokens';
import { Dialog, Button } from '@chakra-ui/react';
import React from 'react';

interface ModalProps {
  open?: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  showFooter?: boolean;
  children?: React.ReactNode;
}

const Modal = ({ open, onClose, title, showFooter, children }: ModalProps) => {
  const tokens = useTokens();
  return (
    <Dialog.Root open={open} onOpenChange={({ open }) => !open && onClose?.()}>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content background={tokens.surface} color={tokens.text} border="1px solid" borderColor={tokens.border}>
          {title && (
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
          )}
          {onClose && <Dialog.CloseTrigger />}
          <Dialog.Body>{children}</Dialog.Body>
          {showFooter && onClose && (
            <Dialog.Footer>
              <Button onClick={onClose}>Close</Button>
            </Dialog.Footer>
          )}
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default Modal;
