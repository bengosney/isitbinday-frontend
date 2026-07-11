import usePageTitle from '../utils/usePageTitle';
import useTokens from '../utils/useTokens';
import ArchiveList from '../widgets/ArchiveList';
import TaskList from '../widgets/TaskList';
import { Button, Flex, Heading, Spacer, Stack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { Route, Routes, useNavigate } from 'react-router-dom';

const BASE_URL = '/iibd/tasks';

const TaskSection = () => {
  usePageTitle('Task List');
  const tokens = useTokens();
  const [openCount, setOpenCount] = useState<number | null>(null);

  const listUrl = BASE_URL;
  const newUrl = `${BASE_URL}/new`;

  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path="archived/*"
        element={
          <>
            <Flex align="center" mt={2} mb={6}>
              <Heading fontSize="22px" fontWeight={600} letterSpacing="-.01em">
                Archive
              </Heading>
              <Spacer />
              <Button size="sm" variant="outline" onClick={() => navigate(listUrl)}>
                Back to board
              </Button>
            </Flex>
            <ArchiveList />
          </>
        }
      />
      <Route
        path="*"
        element={
          <>
            <Flex align="center" mt={2} wrap="wrap" gap={2}>
              <Flex align="baseline" gap={3}>
                <Heading fontSize="22px" fontWeight={600} letterSpacing="-.01em">
                  Tasks
                </Heading>
                {openCount !== null && (
                  <Text fontFamily="mono" fontSize="11px" color={tokens.textDim}>
                    {openCount} open
                  </Text>
                )}
              </Flex>
              <Spacer />
              <Button size="sm" colorPalette="brand" onClick={() => navigate(newUrl)}>
                <MdAdd />
                New task
              </Button>
            </Flex>
            <Stack my={6}>
              <TaskList onCountChange={setOpenCount} />
            </Stack>
          </>
        }
      />
    </Routes>
  );
};

export default TaskSection;
