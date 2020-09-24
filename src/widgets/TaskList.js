import React, { useEffect, useState } from 'react';
import apiFetch, { useApiFetch } from '../utils/apiFetch';
import { UCFirst } from '../utils/string';
import { Stack, Grid, Text, Box, Button } from '@chakra-ui/core';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const TaskList = ({ refreshKey = 0, limit = 15, offset = 0 }) => {
  const [currentOffset, setCurrentOffset] = useState(offset);
  const [states, setStates] = useState([]);
  const [tasks, setTasks] = useState(null);
  const [count, setCount] = useState(0);
  const [transitionMap, setTransitionMap] = useState({});
  const [droppableStates, setDroppableStates] = useState([]);
  const [dragItem, setDragItem] = useState(null);
  const [currentRefreshKey, setCurrentRefreshKey] = useState(refreshKey);
  const refresh = () => setCurrentRefreshKey(currentRefreshKey + 1);

  const data = useApiFetch(`api/tasks/?limit=${limit}&offset=${currentOffset}`, null, currentRefreshKey);

  useEffect(() => {
    if (data !== null) {
      const { results, count: _count } = data;
      setCount(_count);
      setTasks(results);
    }
  }, [data]);

  const statesResponse = useApiFetch(`api/tasks/states/`);
  useEffect(() => {
    if (statesResponse !== null) {
      setStates(statesResponse.states.map(s => s.name));
      const map = {};
      statesResponse.states.forEach(s => {
        s.transitions.forEach(t => map[t] = s.name)
      });

      setTransitionMap(map);
    }
  }, [statesResponse]);

  console.log('transitionMap', transitionMap);

  const pages = Math.ceil(count / limit);
  const currentPage = currentOffset / limit + 1;

  const callAction = (id, action) => apiFetch(`api/tasks/${id}/${action}`).then(() => refresh());
  const makeButtons = (id, actions) =>
    actions.map((action) => (
      <Button size="mini" key={action} onClick={() => callAction(id, action)}>
        {UCFirst(action)}
      </Button>
    ));

  if (tasks === null || typeof tasks == 'undefined' || tasks.length === 0) {
    return <div>Loading...</div>;
  }

  const dragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(tasks, result.source.index, result.destination.index);

    let pos = 1;
    const positions = items.map((i) => ({ id: i.id, position: pos++ }));

    apiFetch(`api/tasks/position/`, { positions });

    setTasks(items);
    setDragItem(null);
    setDroppableStates([]);
  };

  const dragStart = (e) => {
    const _dragItem = tasks.find((t) => t.id == e.draggableId);
    setDragItem(_dragItem);
    console.log(_dragItem);

    const availableStates = [];

    _dragItem.available_state_transitions.forEach((ast) => availableStates.push(transitionMap[ast]));
    setDroppableStates(availableStates);
  };

  const getBorderColour = (state) => {
    if (droppableStates.includes(state)) {
      return 'green.300';
    }

    if (state == (dragItem || {}).state) {
      return 'blue.300';
    }

    return 'white';
  };

  return (
    <React.Fragment>
      <DragDropContext onDragEnd={(e) => dragEnd(e)} onDragStart={(e) => dragStart(e)}>
        <Grid templateColumns={`repeat(${states.length}, 1fr)`} gap={6}>
          {states.filter(state => state.name !== '').map((state) => (
            <Stack key={state}>
              <Text>{UCFirst(state)}</Text>
              <Droppable
                droppableId={state}
                isDropDisabled={!droppableStates.includes(state) && state != (dragItem || {}).state}
              >
                {(provided, snapshot) => (
                  <Stack
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    background={getBorderColour(state)}
                    padding={4}
                    border={'1px solid'}
                    borderColor={'gray.300'}
                  >
                    {tasks.map(
                      ({ id, title, effort, state: taskState, available_state_transitions, position }, index) => {
                        if (state !== taskState) {
                          return null;
                        }

                        return (
                          <Draggable key={id} draggableId={`${id}`} index={index}>
                            {(provided, snapshot) => (
                              <Box
                                key={`${state}-${id}`}
                                border="1px solid lightgray"
                                padding={5}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                background={'gray.50'}
                              >
                                <Text>{title}</Text>
                              </Box>
                            )}
                          </Draggable>
                        );
                      }
                    )}
                    {provided.placeholder}
                  </Stack>
                )}
              </Droppable>
            </Stack>
          ))}
        </Grid>
      </DragDropContext>
    </React.Fragment>
  );
};

export default TaskList;
