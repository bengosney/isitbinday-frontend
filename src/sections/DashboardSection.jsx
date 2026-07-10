import { useApiFetch } from '../utils/apiFetch';
import { UCFirst } from '../utils/string';
import usePageTitle from '../utils/usePageTitle';
import useTokens, { statusColor } from '../utils/useTokens';
import Loader from '../widgets/Loader';
import { Box, Flex, Grid, Heading, Link as ChakraLink, Spacer, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const Module = ({ title, action = null, children }) => {
  const tokens = useTokens();
  return (
    <Stack
      background={tokens.surface}
      border="1px solid"
      borderColor={tokens.border}
      borderRadius="14px"
      paddingX={6}
      paddingY={5}
      spacing={3.5}
    >
      <Flex align="baseline">
        <Text fontSize="14px" fontWeight={600}>
          {title}
        </Text>
        {action && <Box marginLeft="auto">{action}</Box>}
      </Flex>
      {children}
    </Stack>
  );
};

const DashboardSection = () => {
  usePageTitle('Dashboard');
  const tokens = useTokens();

  const data = useApiFetch('api/tasks/tasks/?limit=100&offset=0');
  const statesResponse = useApiFetch('api/tasks/tasks/states/');

  const tasks = data?.results || [];
  const states = (statesResponse?.states || []).map((s) => s.name);

  const dateLabel = new Date().toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });

  // eslint-disable-next-line no-undef
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const dueSoon = tasks
    .filter((t) => t.due_date && !['done', 'cancelled', 'canceled'].includes(`${t.state}`.toLowerCase()))
    .sort((a, b) => new Date(a.due_date) - new Date(b.due_date))
    .slice(0, 5);

  return (
    <Stack spacing={5} marginTop={2}>
      <Flex align="baseline" gridGap={3}>
        <Heading fontSize="22px" fontWeight={600} letterSpacing="-.01em">
          Dashboard
        </Heading>
        <Text fontFamily="mono" fontSize="11px" color={tokens.textDim}>
          {dateLabel}
        </Text>
      </Flex>
      {data === null ? (
        <Loader />
      ) : (
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={5} alignItems="start">
          <Module
            title="Tasks"
            action={
              <ChakraLink as={Link} to="/iibd/tasks" fontSize="12px" fontWeight={500} color={tokens.accentText}>
                Open board
              </ChakraLink>
            }
          >
            <Stack spacing={2.5}>
              {states.map((state) => (
                <Flex key={state} align="center" gridGap={2.5}>
                  <Box width="8px" height="8px" borderRadius="full" background={statusColor(state)} flex="none" />
                  <Text fontSize="13px" color={tokens.textBody}>
                    {UCFirst(state)}
                  </Text>
                  <Spacer />
                  <Text fontFamily="mono" fontSize="12px" color={tokens.textMuted}>
                    {tasks.filter((t) => t.state === state).length}
                  </Text>
                </Flex>
              ))}
            </Stack>
          </Module>
          <Module title="Due soon">
            {dueSoon.length === 0 ? (
              <Text fontSize="12px" color={tokens.textDim}>
                No tasks have due dates.
              </Text>
            ) : (
              <Stack spacing={2.5}>
                {dueSoon.map((task) => {
                  const dateObj = new Date(task.due_date);
                  const days = Math.floor((dateObj.getTime() - new Date().getTime()) / 8.64e7);
                  const overdue = days < 0;

                  return (
                    <Flex
                      key={task.id}
                      align="center"
                      gridGap={2.5}
                      background={tokens.hoverBg}
                      border="1px solid"
                      borderColor={tokens.border}
                      borderRadius="10px"
                      paddingX={3.5}
                      paddingY={3}
                    >
                      <Text fontSize="13.5px" fontWeight={500} wordBreak="break-word">
                        {task.title}
                      </Text>
                      <Spacer />
                      <Text
                        as="span"
                        title={dateObj.toDateString()}
                        fontFamily="mono"
                        fontSize="10.5px"
                        color={overdue ? tokens.dangerText : tokens.dueText}
                        background={overdue ? tokens.dangerSoft : tokens.dueSoft}
                        paddingX={2}
                        paddingY="2px"
                        borderRadius="full"
                        flex="none"
                      >
                        {rtf.format(days, 'days')}
                      </Text>
                    </Flex>
                  );
                })}
              </Stack>
            )}
          </Module>
        </Grid>
      )}
    </Stack>
  );
};

export default DashboardSection;
