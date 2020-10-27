import React, { useCallback, useEffect, useState } from 'react';
import apiFetch, { useApiFetch } from '../utils/apiFetch';
import { UCFirst } from '../utils/string';
import { Stack, Grid, Text, Box } from '@chakra-ui/core';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import TaskModalSection from '../sections/TaskModalsSection';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const TaskList = () => {
  const [states, setStates] = useState([]);
  const [hiddenStates, setHiddenStates] = useState([]);
  const [tasks, setTasks] = useState(null);
  const [transitionMap, setTransitionMap] = useState({});
  const [droppableStates, setDroppableStates] = useState([]);
  const [dragItem, setDragItem] = useState(null);
  const [currentRefreshKey, setCurrentRefreshKey] = useState(0);
  const refresh = () => setCurrentRefreshKey(currentRefreshKey + 1);

  const limit = 100;
  const offset = 0;

  const data = useApiFetch(`api/tasks/?limit=${limit}&offset=${offset}`, null, `${currentRefreshKey}`);
  useEffect(() => {
    if (data !== null) {
      const { results } = data;
      setTasks(results);
    }
  }, [data]);

  const mapTransitions = useCallback(
    (states) => {
      const map = transitionMap;
      states.forEach((s) => {
        s.transitions.forEach((t) => (map[t] = s.name));
      });

      setTransitionMap(map);
    },
    [transitionMap]
  );

  const statesResponse = useApiFetch(`api/tasks/states/`);
  useEffect(() => {
    if (statesResponse !== null) {
      const { states: _states = [] } = statesResponse;
      setStates(_states.map((s) => s.name));

      mapTransitions(_states);
    }
  }, [statesResponse, mapTransitions]);

  const hiddenStatesResponse = useApiFetch(`api/tasks/hidden_states/`);
  useEffect(() => {
    if (hiddenStatesResponse !== null) {
      const { states: _states = [] } = hiddenStatesResponse;
      setHiddenStates(_states);

      mapTransitions(_states);
    }
  }, [hiddenStatesResponse, mapTransitions]);

  const callAction = (id, action) => apiFetch(`api/tasks/${id}/${action}`).then(() => refresh());

  if (tasks === null || typeof tasks == 'undefined' || tasks.length === 0) {
    return <div>Loading...</div>;
  }

  const dragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(tasks, result.source.index, result.destination.index);

    const _dragItem = tasks.find((t) => t.id === parseInt(result.draggableId));
    const action = Object.keys(transitionMap).find((key) => transitionMap[key] === result.destination.droppableId);

    if (_dragItem.state !== result.destination.droppableId) {
      callAction(_dragItem.id, action);
    }

    let pos = 1;
    const positions = items.map((i) => ({ id: i.id, position: pos++ }));

    apiFetch(`api/tasks/position/`, { positions });

    setTasks(items);
    setDragItem(null);
    setDroppableStates([]);
  };

  const dragStart = (e) => {
    const _dragItem = tasks.find((t) => t.id === parseInt(e.draggableId));
    setDragItem(_dragItem);

    const availableStates = [];

    _dragItem.available_state_transitions.forEach((ast) => availableStates.push(transitionMap[ast]));
    setDroppableStates(availableStates);
  };

  const getBorderColour = (state) => {
    if (droppableStates.includes(state)) {
      return 'green.300';
    }

    if (state === (dragItem || {}).state) {
      return 'blue.300';
    }

    return 'white';
  };

  return (
    <React.Fragment>
      <DragDropContext onDragEnd={(e) => dragEnd(e)} onDragStart={(e) => dragStart(e)}>
        <Grid>
          {hiddenStates.map((state) => (
            <React.Fragment key={state.name}>
              <Droppable droppableId={state.name} /*isDropDisabled={!droppableStates.includes(state)}*/>
                {(provided, snapshot) => (
                  <Box
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    border="1px solid lightgray"
                    padding={5}
                    background={getBorderColour(state)}
                  >
                    <Text>{UCFirst(state.name)}</Text>
                  </Box>
                )}
              </Droppable>
            </React.Fragment>
          ))}
        </Grid>
        <Grid templateColumns={`repeat(${states.length}, 1fr)`} gap={6}>
          {states.map((state) => (
            <Stack key={state}>
              <Text>{UCFirst(state)}</Text>
              <Box height={'100%'}>
                <Droppable
                  droppableId={state}
                  isDropDisabled={!droppableStates.includes(state) && state !== (dragItem || {}).state}
                >
                  {(provided, snapshot) => (
                    <Stack
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      background={getBorderColour(state)}
                      padding={4}
                      border={'1px solid'}
                      borderColor={'gray.300'}
                      height={'100%'}
                    >
                      {tasks.map((task, index) => {
                        const { id, state: taskState } = task;
                        if (state !== taskState) {
                          return null;
                        }

                        return (
                          <Draggable key={id} draggableId={`${id}`} index={index}>
                            {(provided, snapshot) => (
                              <Box ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                <TaskCard task={task} />
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
