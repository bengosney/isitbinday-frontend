import React from 'react';
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
  Stack,
  IconButton,
} from '@chakra-ui/core';
import EditTask from './EditTask';
import { MdModeEdit } from 'react-icons/md';

const TaskCard = ({ task }) => {
  const { id, title, effort, state, due } = task;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box key={`${state}-${id}`} border="1px solid lightgray" padding={5} background={'gray.50'}>
        <Stack>
          <Heading fontSize={'1em'}>{title}</Heading>
          <Stack direction={'row'} justify={'space-between'}>
            <Stack>
              <Text>{`Effort: ${effort || '-'}`}</Text>
              <Text>{`Due: ${due || '-'}`}</Text>
            </Stack>
            <IconButton colorScheme={'blue'} size={'sm'} aria-label="Edit" icon={<MdModeEdit />} onClick={onOpen} />
          </Stack>
        </Stack>
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
