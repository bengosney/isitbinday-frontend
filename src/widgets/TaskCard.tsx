import apiFetch from '../utils/apiFetch';
import useTokens, { statusColor } from '../utils/useTokens';
import { chakra, Flex, IconButton, Stack, Text, Link as LinkElement } from '@chakra-ui/react';
import Linkify from 'linkify-react';
import type { IntermediateRepresentation } from 'linkifyjs';
import React from 'react';
import { MdClose, MdDone, MdModeEdit, MdOpenInNew } from 'react-icons/md';
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

const TaskCard = ({ task, showDueDate = true, onSateChange = null }: TaskCardProps) => {
  const { id, title, state, due_date, available_state_transitions } = task;
  // Base list URL — strip any open modal segment from the current location
  const path = useLocation().pathname.replace(/\/(new|edit\/[^/]+)\/?$/, '');
  const tokens = useTokens();

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

  const stateMark = (
    <chakra.button
      type="button"
      aria-label={resolved ? stateName : 'Mark as done'}
      onClick={toDone}
      disabled={!canDone}
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="16px"
      height="16px"
      borderRadius="full"
      flex="none"
      marginTop="7px"
      padding={0}
      cursor={canDone ? 'pointer' : 'default'}
      border={resolved ? 'none' : '1.5px solid'}
      borderColor={tokens.checkboxBorder}
      background={resolved ? statusColor(stateName) : 'transparent'}
      color={tokens.appBg}
    >
      {resolved && (isDone ? <MdDone size="11px" /> : <MdClose size="11px" />)}
    </chakra.button>
  );

  const chips = [];
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

  const renderLink = ({ attributes, content }: IntermediateRepresentation) => {
    return (
      <LinkElement
        color={resolved ? tokens.textDim : tokens.accentText}
        textDecoration="underline"
        textUnderlineOffset="2px"
        overflowWrap="anywhere"
        gap={'0.15em'}
        _hover={{
          color: tokens.accent,
          textDecoration: 'underline',
        }}

        {...attributes}
      >
        <Text as="span">{content}</Text>
        <MdOpenInNew />
      </LinkElement>
    );
  };

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
      <Stack paddingTop={'4px'} gap={2} minW={0} flex="1">
        <Text
          fontSize="14px"
          fontWeight={500}
          lineHeight={1.45}
          wordBreak="break-word"
          color={resolved ? tokens.textMuted : tokens.text}
        >
          <Linkify options={{ render: renderLink, target: '_blank', rel: 'noopener noreferrer' }}>{title}</Linkify>
        </Text>
        {chips.length > 0 && (
          <Flex wrap="wrap" gap={1.5}>
            {chips}
          </Flex>
        )}
      </Stack>
      {/* Negative margin centres the (taller) icon button on the first text line's optical centre,
          which sits ~1px below the line-box centre for mostly-lowercase text */}
      <IconButton
        asChild
        variant="ghost"
        size="xs"
        aria-label="Edit"
        color={resolved ? tokens.textDim : tokens.textMuted}
        flex="none"
        marginTop="-1px"
      >
        <Link to={`${path}/edit/${id}`.replace('//', '/')}>
          <MdModeEdit />
        </Link>
      </IconButton>
    </Flex>
  );
};

export default TaskCard;
