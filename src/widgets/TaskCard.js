import React, {useRef} from 'react';
import {
  Box,
  Text,
  Heading,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Input,
} from '@chakra-ui/core';
import NewTask from './NewTask';
import EditTask from './EditTask';

const TaskCard = ({ task }) => {
  const { id, title, effort, state, available_state_transitions, position } = task;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const buttonRef = useRef();

  return (
    <>
      <Box key={`${state}-${id}`} border="1px solid lightgray" padding={5} background={'gray.50'} onClick={onOpen}>
        <Heading fontSize={'1em'}>{title}</Heading>
        <Text>{`Effort: ${effort || '-'}`}</Text>
      </Box>
      <Drawer isOpen={isOpen} onClose={onClose} placement={'right'}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Edit Task</DrawerHeader>

            <DrawerBody>
              <EditTask task={task} />
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button color="blue">Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default TaskCard;
