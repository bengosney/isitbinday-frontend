import TaskModalSection from '../sections/TaskModalsSection';
import apiFetch, { useApiFetch } from '../utils/apiFetch';
import { UCFirst } from '../utils/string';
import Loader from './Loader';
import TaskCard from './TaskCard';
import { Stack, Grid, Text, Box, useBreakpointValue, useColorModeValue } from '@chakra-ui/react';
import React, { useCallback, useEffect, useReducer } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Redirect, useLocation } from 'react-router-dom';
import * as Yup from 'yup';

const reorder = (list, startIndex, endIndex) => {
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

const TaskList = () => {
  const direction = useBreakpointValue({ base: 'row', md: 'column' });
  const [widgetState, dispatch] = useReducer((state, action) => {
    const makeState = (newState) => {
      const _newState = { ...state, ...newState };

      return stateShape.cast(_newState);
    };

    switch (action.type) {
      default:
        if (typeof state[action.type] !== 'undefined') {
          return makeState({ [action.type]: action.data || undefined });
        } else {
          throw new Error(`Unsupported action type: ${action.type}`);
        }
    }
  }, stateShape.cast({}));

  const { states, actions, tasks, transitionMap, droppableStates, dragItem, currentRefreshKey, dueDateStates } =
    widgetState;

  const refresh = () => dispatch({ type: 'currentRefreshKey', data: currentRefreshKey + 1 });

  const limit = 100;
  const offset = 0;
  const location = useLocation();

  const green = useColorModeValue('green.300', 'green.600');
  const blue = useColorModeValue('blue.300', 'blue.600');

  const actionsResponse = useApiFetch('api/tasks/tasks/actions/');
  useEffect(() => {
    dispatch({ type: 'actions', data: actionsResponse || [] });
  }, [actionsResponse]);

  const data = useApiFetch(`api/tasks/tasks/?limit=${limit}&offset=${offset}`, null, `${currentRefreshKey}`);
  useEffect(() => {
    if (data !== null) {
      const { results } = data;
      dispatch({ type: 'tasks', data: results });
    }
    dispatch({ type: 'tasks', data: data?.results || undefined });
  }, [data]);

  const dueDateData = useApiFetch(`api/tasks/tasks/due_date_states/`);
  useEffect(() => {
    dispatch({ type: 'dueDateStates', data: dueDateData?.states || [] });
  }, [dueDateData]);

  const mapTransitions = useCallback(
    (states) => {
      const map = transitionMap;
      states.forEach((s) => {
        s.transitions.forEach((t) => (map[t] = s.name));
      });

      dispatch({ type: 'transitionMap', data: map });
    },
    [transitionMap]
  );

  const statesResponse = useApiFetch(`api/tasks/tasks/states/`);
  useEffect(() => {
    if (statesResponse !== null) {
      const { states: _states = [] } = statesResponse;
      dispatch({ type: 'states', data: _states.map((s) => s.name) });

      mapTransitions(_states);
    }
  }, [statesResponse, mapTransitions]);

  const hiddenStatesResponse = useApiFetch(`api/tasks/tasks/hidden_states/`);
  useEffect(() => {
    if (hiddenStatesResponse !== null) {
      const { states: _states = [] } = hiddenStatesResponse;
      dispatch({ type: 'hiddenStates', data: _states });

      mapTransitions(_states);
    }
  }, [hiddenStatesResponse, mapTransitions]);

  const callAction = (id, action) => apiFetch(`api/tasks/tasks/${id}/${action}`).then(() => refresh());

  if (tasks === null || typeof tasks == 'undefined') {
    return <Loader />;
  }

  const dragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(tasks, result.source.index, result.destination.index);

    const _dragItem = tasks.find((t) => t.id === parseInt(result.draggableId));
    const action =
      Object.keys(transitionMap).find((key) => transitionMap[key] === result.destination.droppableId) ||
      result.destination.droppableId;

    if (_dragItem.state !== result.destination.droppableId) {
      callAction(_dragItem.id, action);
      _dragItem.state = action;
    }

    let pos = 1;
    const positions = items.map((i) => ({ id: i.id, position: pos++ }));

    apiFetch(`api/tasks/tasks/position/`, { positions });
    _dragItem.position = positions
      .filter((i) => i.id === _dragItem.id)
      .map((i) => i.position)
      .reduce((acc, cur) => cur, 0);

    dispatch({ type: 'tasks', data: items });
    dispatch({ type: 'dragItem', data: null });
    dispatch({ type: 'droppableStates', data: [] });
  };

  const dragStart = (e) => {
    const _dragItem = tasks.find((t) => t.id === parseInt(e.draggableId));
    dispatch({ type: 'dragItem', data: _dragItem });

    const availableStates = [];

    _dragItem.available_state_transitions.forEach((ast) => availableStates.push(transitionMap[ast]));
    dispatch({ type: 'droppableStates', data: availableStates });
  };

  const getBackgroundColour = (state) => {
    if (droppableStates.includes(state)) {
      return green;
    }

    if (state === (dragItem || {}).state) {
      return blue;
    }
  };

  if (tasks.length === 0) {
    const redirectTo = `${location.pathname}/new`.replace('//', '/');
    const redirect = location.pathname.endsWith('new') ? null : <Redirect to={redirectTo} />;
    return (
      <>
        {redirect}
        <Text>No tasks</Text>
        <TaskModalSection refresh={refresh} />
      </>
    );
  }

  return (
    <React.Fragment>
      <DragDropContext onDragEnd={(e) => dragEnd(e)} onDragStart={(e) => dragStart(e)}>
        <Grid>
          {actions.map((action) => (
            <React.Fragment key={action}>
              <Droppable droppableId={action}>
                {(provided) => (
                  <Box
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    border="1px solid lightgray"
                    padding={5}
                    background={getBackgroundColour(action)}
                  >
                    <Text>{UCFirst(action)}</Text>
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </React.Fragment>
          ))}
        </Grid>
        <Grid templateColumns={direction == 'row' ? '1' : `repeat(${states.length}, 1fr)`} gap={6}>
          {states.map((state) => (
            <Stack key={state}>
              <Text>{UCFirst(state)}</Text>
              <Box height={'100%'}>
                <Droppable
                  droppableId={state}
                  isDropDisabled={!droppableStates.includes(state) && state !== (dragItem || {}).state}
                >
                  {(provided) => (
                    <Stack
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      background={getBackgroundColour(state)}
                      padding={4}
                      border={'1px solid'}
                      borderColor={'gray.300'}
                      height={'100%'}
                      minHeight={'10vh'}
                    >
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
          ))}
        </Grid>
      </DragDropContext>
      <TaskModalSection refresh={refresh} />
    </React.Fragment>
  );
};

export default TaskList;
