import { Button, Dialog } from '@chakra-ui/react';
import React from 'react';

interface ConfirmDialogProps {
  open?: boolean;
  onClose?: () => void;
  loading?: boolean;
  onConfirm?: () => void;
  title?: React.ReactNode;
  body?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
}

const ConfirmDialog = ({
  open,
  onClose,
  loading,
  onConfirm,
  title,
  body,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
}: ConfirmDialogProps) => (
  <Dialog.Root open={open} onOpenChange={({ open }) => !open && onClose?.()} role="alertdialog">
    <Dialog.Backdrop />
    <Dialog.Positioner>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title fontSize="lg" fontWeight="bold">
            {title}
          </Dialog.Title>
        </Dialog.Header>
        <Dialog.Body>{body}</Dialog.Body>
        <Dialog.Footer>
          <Button onClick={onClose} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button colorPalette="red" onClick={onConfirm} ml={3} loading={loading}>
            {confirmLabel}
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Positioner>
  </Dialog.Root>
);

export default ConfirmDialog;
