import React, { useEffect, useState } from 'react';
import apiFetch, { useApiFetch } from '../utils/apiFetch';
import { Button, Pagination, Card } from 'semantic-ui-react';
import { UCFirst } from '../utils/string';
import { Stack } from '@chakra-ui/core';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const TaskList = ({ refreshKey = 0, limit = 15, offset = 0 }) => {
  const [currentOffset, setCurrentOffset] = useState(offset);
  const [tasks, setTasks] = useState(null);
  const [count, setCount] = useState(0);
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

  const pages = Math.ceil(count / limit);
  const currentPage = currentOffset / limit + 1;

  const callAction = (id, action) => apiFetch(`api/tasks/${id}/${action}`).then(() => refresh());
  const makeButtons = (id, actions) =>
    actions.map((action) => (
      <Button size="mini" key={action} onClick={() => callAction(id, action)}>
        {UCFirst(action)}
      </Button>
    ));

  if (tasks === null || tasks.length === 0) {
    return <div>Loading...</div>;
  }

  const dragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(tasks, result.source.index, result.destination.index);

    let pos = 1;
    //const positions = items.map((i) => ({ id: i.id, position: pos++ }));
    const positions = items.map((i) => ({ id: i.id, position: pos++ }));

    apiFetch(`api/tasks/position/`, { positions });

    setTasks(items);
  };

  return (
    <React.Fragment>
      <DragDropContext onDragEnd={(e) => dragEnd(e)}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <Stack {...provided.droppableProps} ref={provided.innerRef}>
              {tasks.map(({ id, title, effort, state, available_state_transitions, position }, index) => (
                <Draggable key={id} draggableId={`${id}`} index={index}>
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <Card>
                        <Card.Content>
                          <Card.Header>{title}</Card.Header>
                          <Card.Meta>State: {state}</Card.Meta>
                        </Card.Content>
                        <Card.Content extra>{makeButtons(id, available_state_transitions)}</Card.Content>
                      </Card>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Stack>
          )}
        </Droppable>
      </DragDropContext>
      <Pagination
        activePage={currentPage}
        totalPages={pages}
        onPageChange={(e, { activePage }) => setCurrentOffset((activePage - 1) * limit)}
        size="mini"
        firstItem={null}
        lastItem={null}
        prevItem={null}
        nextItem={null}
      />
    </React.Fragment>
  );
};

export default TaskList;
