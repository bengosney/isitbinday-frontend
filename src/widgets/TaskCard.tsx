import apiFetch from '../utils/apiFetch';
import useTokens, { statusColor } from '../utils/useTokens';
import { Box, Flex, IconButton, Link as ChakraLink, Stack, Text } from '@chakra-ui/react';
import { find } from 'linkifyjs';
import React from 'react';
import { MdClose, MdDone, MdModeEdit } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';

interface Task {
  id: number;
  title?: string;
  state?: string;
  due_date?: string | null;
  available_state_transitions?: string[];
  [key: string]: unknown;
}

interface TaskCardProps {
  task: Task;
  showDueDate?: boolean;
  onSateChange?: ((state: string) => void) | null;
}

const hostname = (href: string): string => {
  try {
    return new URL(href).hostname.replace(/^www\./, '');
  } catch {
    return href;
  }
};

const TaskCard = ({ task, showDueDate = true, onSateChange = null }: TaskCardProps) => {
  const { id, title, state, due_date, available_state_transitions } = task;
  // Base list URL — strip any open modal segment from the current location
  const path = useLocation().pathname.replace(/\/(new|edit\/[^/]+)\/?$/, '');
  const tokens = useTokens();

  const links = find(title || '', 'url');
  let displayTitle = title || '';
  links.forEach((link) => {
    displayTitle = displayTitle.replace(link.value, '');
  });
  displayTitle = displayTitle.replace(/\s{2,}/g, ' ').trim();
  if (displayTitle === '' && links.length > 0) {
    displayTitle = hostname(links[0].href);
  }

  let due = null;
  if (due_date) {
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    const dateObj = new Date(due_date);
    const days = Math.floor((dateObj.getTime() - new Date().getTime()) / 8.64e7);
    due = { label: `Due ${rtf.format(days, 'days')}`, date: dateObj.toDateString(), overdue: days < 0 };
  }

  const toDone = () => {
    apiFetch(`api/tasks/tasks/${id}/done/`).then(() => onSateChange?.('done'));
  };

  const stateName = `${state}`.toLowerCase();
  const isDone = stateName === 'done';
  const isCancelled = stateName === 'cancelled' || stateName === 'canceled';
  const resolved = isDone || isCancelled;
  const canDone = (available_state_transitions || []).includes('done');

  let stateMark;
  if (resolved) {
    stateMark = (
      <Flex
        width="16px"
        height="16px"
        borderRadius="full"
        background={statusColor(stateName)}
        align="center"
        justify="center"
        flex="none"
        marginTop="2px"
        color={tokens.appBg}
      >
        {isDone ? <MdDone size="11px" /> : <MdClose size="11px" />}
      </Flex>
    );
  } else if (canDone) {
    stateMark = (
      <button
        type="button"
        aria-label="Mark as done"
        onClick={toDone}
        style={{
          width: '16px',
          height: '16px',
          borderRadius: '9999px',
          border: `1.5px solid ${tokens.checkboxBorder}`,
          flex: 'none',
          marginTop: '2px',
          cursor: 'pointer',
          background: 'transparent',
          padding: 0,
        }}
      />
    );
  } else {
    stateMark = (
      <Box
        as="span"
        width="16px"
        height="16px"
        borderRadius="full"
        border="1.5px solid"
        borderColor={tokens.checkboxBorder}
        flex="none"
        marginTop="2px"
      />
    );
  }

  const chips = [];
  links.forEach((link) => {
    chips.push(
      <ChakraLink
        key={`link-${link.href}`}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        fontFamily="mono"
        fontSize="10.5px"
        color={resolved ? tokens.textDim : tokens.accentText}
        background={resolved ? tokens.hoverBg : tokens.accentSoft}
        paddingX={2}
        paddingY="2px"
        borderRadius="full"
        _hover={{ textDecoration: 'none', opacity: 0.8 }}
      >
        {hostname(link.href)}
      </ChakraLink>
    );
  });
  if (showDueDate && due) {
    chips.push(
      <Text
        key="due"
        as="span"
        title={due.date}
        fontFamily="mono"
        fontSize="10.5px"
        color={due.overdue ? tokens.dangerText : tokens.dueText}
        background={due.overdue ? tokens.dangerSoft : tokens.dueSoft}
        paddingX={2}
        paddingY="2px"
        borderRadius="full"
      >
        {due.label}
      </Text>
    );
  }

  return (
    <Flex
      border="1px solid"
      borderColor={tokens.border}
      borderRadius="10px"
      background={resolved ? tokens.surfaceMuted : tokens.surface}
      paddingX="15px"
      paddingY="13px"
      gap={3}
      align="flex-start"
    >
      {stateMark}
      <Stack gap={2} minW={0} flex="1">
        <Text
          fontSize="14px"
          fontWeight={500}
          lineHeight={1.45}
          wordBreak="break-word"
          color={resolved ? tokens.textMuted : tokens.text}
        >
          {displayTitle}
        </Text>
        {chips.length > 0 && (
          <Flex wrap="wrap" gap={1.5}>
            {chips}
          </Flex>
        )}
      </Stack>
      <Link to={`${path}/edit/${id}`.replace('//', '/')}>
        <IconButton
          variant="ghost"
          size="xs"
          aria-label="Edit"
          color={resolved ? tokens.textDim : tokens.textMuted}
          flex="none"
        >
          <MdModeEdit />
        </IconButton>
      </Link>
    </Flex>
  );
};

export default TaskCard;
