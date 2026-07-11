import TaskModalSection from '../sections/TaskModalsSection';
import apiFetch, { useApiFetch } from '../utils/apiFetch';
import { UCFirst } from '../utils/string';
import useTokens, { statusColor } from '../utils/useTokens';
import Loader from './Loader';
import TaskCard from './TaskCard';
import { Stack, Grid, Flex, Text, Box, useBreakpointValue } from '@chakra-ui/react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import React, { useCallback, useEffect, useReducer } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import * as Yup from 'yup';

interface TaskItem {
  id: number;
  state?: string;
  position?: number;
  available_state_transitions?: string[];
  [key: string]: unknown;
}

interface TaskListState {
  dueDateStates: string[];
  states: string[];
  hiddenStates: string[];
  tasks: TaskItem[] | null | undefined;
  transitionMap: Record<string, string>;
  droppableStates: string[];
  dragItem: TaskItem | null | undefined;
  currentRefreshKey: number;
  actions: string[];
}

interface TaskListProps {
  onCountChange?: ((count: number | null) => void) | null;
}

const reorder = (list: TaskItem[], startIndex: number, endIndex: number): TaskItem[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const stateShape = Yup.object().shape({
  dueDateStates: Yup.array().default([]),
  states: Yup.array().default([]),
  hiddenStates: Yup.array().default([]),
  tasks: Yup.array().nullable().default(null),
  transitionMap: Yup.object().default({}),
  droppableStates: Yup.array().default([]),
  dragItem: Yup.mixed().nullable().default(0),
  currentRefreshKey: Yup.number().default(0),
  actions: Yup.array().default([]),
});

const emptyColumnCopy = (state: string): { title: string; hint?: string } => {
  switch (`${state}`.toLowerCase()) {
    case 'doing':
    case 'in progress':
      return { title: 'Nothing in progress', hint: 'Drag a task here to start it' };
    case 'done':
      return { title: 'Nothing done yet' };
    default:
      return { title: `No ${`${state}`.toLowerCase()} tasks` };
  }
};

const TaskList = ({ onCountChange = null }: TaskListProps) => {
  const direction = useBreakpointValue({ base: 'row', md: 'column' });
  const tokens = useTokens();
  interface WidgetAction {
    type: keyof TaskListState;
    data?: unknown;
  }
  const [widgetState, dispatch] = useReducer((state: TaskListState, action: WidgetAction): TaskListState => {
    const makeState = (newState: Partial<TaskListState>): TaskListState => {
      const _newState = { ...state, ...newState };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (stateShape as any).cast(_newState) as TaskListState;
    };

    switch (action.type) {
      default:
        if (typeof state[action.type] !== 'undefined') {
          return makeState({ [action.type]: action.data ?? undefined });
        } else {
          throw new Error(`Unsupported action type: ${action.type as string}`);
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, (stateShape as any).cast({}) as TaskListState);

  const { states, actions, tasks, transitionMap, droppableStates, dragItem, currentRefreshKey, dueDateStates } =
    widgetState;

  const refresh = () => dispatch({ type: 'currentRefreshKey', data: currentRefreshKey + 1 });

  const limit = 100;
  const offset = 0;
  const location = useLocation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const actionsResponse = useApiFetch('api/tasks/tasks/actions/') as any;
  useEffect(() => {
    dispatch({ type: 'actions', data: actionsResponse || [] });
  }, [actionsResponse]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = useApiFetch(`api/tasks/tasks/?limit=${limit}&offset=${offset}`, null, currentRefreshKey) as any;
  useEffect(() => {
    if (data !== null) {
      const { results } = data;
      dispatch({ type: 'tasks', data: results });
    }
    dispatch({ type: 'tasks', data: data?.results || undefined });
  }, [data]);

  useEffect(() => {
    if (onCountChange !== null) {
      onCountChange(tasks === null || typeof tasks == 'undefined' ? null : tasks.length);
    }
  }, [tasks, onCountChange]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dueDateData = useApiFetch(`api/tasks/tasks/due_date_states/`) as any;
  useEffect(() => {
    dispatch({ type: 'dueDateStates', data: dueDateData?.states || [] });
  }, [dueDateData]);

  const mapTransitions = useCallback(
    (states: Array<{ name: string; transitions: string[] }>) => {
      const map = transitionMap;
      states.forEach((s) => {
        s.transitions.forEach((t) => (map[t] = s.name));
      });

      dispatch({ type: 'transitionMap', data: map });
    },
    [transitionMap]
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const statesResponse = useApiFetch(`api/tasks/tasks/states/`) as any;
  useEffect(() => {
    if (statesResponse !== null) {
      const { states: _states = [] } = statesResponse;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dispatch({ type: 'states', data: _states.map((s: any) => s.name) });

      mapTransitions(_states);
    }
  }, [statesResponse, mapTransitions]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hiddenStatesResponse = useApiFetch(`api/tasks/tasks/hidden_states/`) as any;
  useEffect(() => {
    if (hiddenStatesResponse !== null) {
      const { states: _states = [] } = hiddenStatesResponse;
      dispatch({ type: 'hiddenStates', data: _states });

      mapTransitions(_states);
    }
  }, [hiddenStatesResponse, mapTransitions]);

  const callAction = (id: number, action: string) => apiFetch(`api/tasks/tasks/${id}/${action}`).then(() => refresh());

  if (tasks === null || typeof tasks == 'undefined') {
    return <Loader />;
  }

  const dragEnd = (result: import('@hello-pangea/dnd').DropResult) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(tasks, result.source.index, result.destination.index);

    const _dragItem = tasks.find((t) => t.id === parseInt(result.draggableId));
    if (!_dragItem) return;

    const action =
      Object.keys(transitionMap).find((key) => transitionMap[key] === result.destination!.droppableId) ||
      result.destination!.droppableId;

    if (_dragItem.state !== result.destination!.droppableId) {
      callAction(_dragItem.id, action);
      _dragItem.state = action;
    }

    let pos = 1;
    const positions = items.map((i) => ({ id: i.id, position: pos++ }));

    apiFetch(`api/tasks/tasks/position/`, { positions: positions as unknown as Record<string, unknown>[] });
    _dragItem.position = positions
      .filter((i) => i.id === _dragItem.id)
      .map((i) => i.position)
      .reduce((acc, cur) => cur, 0);

    dispatch({ type: 'tasks', data: items });
    dispatch({ type: 'dragItem', data: null });
    dispatch({ type: 'droppableStates', data: [] });
  };

  const dragStart = (e: import('@hello-pangea/dnd').DragStart) => {
    const _dragItem = tasks.find((t) => t.id === parseInt(e.draggableId));
    dispatch({ type: 'dragItem', data: _dragItem });

    const availableStates: string[] = [];

    _dragItem?.available_state_transitions?.forEach((ast) => availableStates.push(transitionMap[ast]));
    dispatch({ type: 'droppableStates', data: availableStates });
  };

  const getDropProps = (state: string): Record<string, string> => {
    if (droppableStates.includes(state)) {
      return { background: tokens.accentSoft, borderColor: tokens.accent, borderStyle: 'dashed' };
    }

    if (state === (dragItem || {}).state) {
      return { background: tokens.hoverBg, borderColor: tokens.borderStrong, borderStyle: 'dashed' };
    }

    return { borderColor: 'transparent' };
  };

  if (tasks.length === 0) {
    const redirectTo = `${location.pathname}/new`.replace('//', '/');
    const redirect = location.pathname.endsWith('new') ? null : <Navigate to={redirectTo} replace />;
    return (
      <>
        {redirect}
        <Text color={tokens.textDim}>No tasks</Text>
        <TaskModalSection refresh={refresh} />
      </>
    );
  }

  return (
    <React.Fragment>
      <DragDropContext onDragEnd={(e) => dragEnd(e)} onDragStart={(e) => dragStart(e)}>
        {actions.length > 0 && (
          <Flex gap={5} marginBottom={5}>
            {actions.map((action) => (
              <Droppable key={action} droppableId={action}>
                {(provided, snapshot) => (
                  <Flex
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    flex="1"
                    align="center"
                    justify="center"
                    gap={2}
                    minHeight="42px"
                    border="1px dashed"
                    borderColor={
                      snapshot.isDraggingOver ? tokens.accent : dragItem ? tokens.borderStrong : tokens.border
                    }
                    background={snapshot.isDraggingOver ? tokens.accentSoft : dragItem ? tokens.hoverBg : 'transparent'}
                    borderRadius="10px"
                    transition=".15s ease-in-out background, .15s ease-in-out border-color"
                  >
                    <Text
                      fontSize="11.5px"
                      fontWeight={600}
                      letterSpacing=".07em"
                      textTransform="uppercase"
                      color={snapshot.isDraggingOver ? tokens.accentText : tokens.textDim}
                    >
                      {dragItem ? `Drop to ${action}` : UCFirst(action)}
                    </Text>
                    {provided.placeholder}
                  </Flex>
                )}
              </Droppable>
            ))}
          </Flex>
        )}
        <Grid
          minHeight={'50vh'}
          templateColumns={direction === 'row' ? '1' : `repeat(${states.length}, 1fr)`}
          gap={5}
          alignItems={'start'}
        >
          {states.map((state) => {
            const count = tasks.filter((t) => t.state === state).length;
            const empty = emptyColumnCopy(state);

            return (
              <Stack key={state} gap={2.5}>
                <Flex align="center" gap={2} paddingX={1}>
                  <Box width="8px" height="8px" borderRadius="full" background={statusColor(state)} flex="none" />
                  <Text
                    fontSize="11.5px"
                    fontWeight={600}
                    letterSpacing=".07em"
                    textTransform="uppercase"
                    color={tokens.textMuted}
                  >
                    {state}
                  </Text>
                  <Text fontFamily="mono" fontSize="11px" color={tokens.textDim}>
                    {count}
                  </Text>
                </Flex>
                <Box height={'100%'}>
                  <Droppable
                    droppableId={state}
                    isDropDisabled={!droppableStates.includes(state) && state !== (dragItem || {}).state}
                  >
                    {(provided) => (
                      <Stack
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        gap={2.5}
                        border="1px solid"
                        borderRadius="10px"
                        height={'100%'}
                        minHeight={'10vh'}
                        {...getDropProps(state)}
                      >
                        {count === 0 && !dragItem && (
                          <Box
                            border="1px dashed"
                            borderColor={tokens.borderStrong}
                            borderRadius="10px"
                            paddingX={4}
                            paddingY={6}
                            textAlign="center"
                          >
                            <Text fontSize="12px" color={tokens.textDim}>
                              {empty.title}
                            </Text>
                            {empty.hint && (
                              <Text fontSize="11px" color={tokens.textDim} opacity={0.75}>
                                {empty.hint}
                              </Text>
                            )}
                          </Box>
                        )}
                        {tasks.map((task, index) => {
                          const { id, state: taskState } = task;
                          if (state !== taskState) {
                            return null;
                          }

                          return (
                            <Draggable key={id} draggableId={`${id}`} index={index}>
                              {(provided) => (
                                <Box ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                  <TaskCard
                                    task={task}
                                    showDueDate={dueDateStates.includes(state)}
                                    onSateChange={() => refresh()}
                                  />
                                </Box>
                              )}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </Stack>
                    )}
                  </Droppable>
                </Box>
              </Stack>
            );
          })}
        </Grid>
      </DragDropContext>
      <TaskModalSection refresh={refresh} />
    </React.Fragment>
  );
};

export default TaskList;
