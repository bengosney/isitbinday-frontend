import React, { useState } from 'react';
import apiFetch, { useApiFetch } from '../utils/apiFetch';
import { Button, Pagination, Menu, List, Grid } from 'semantic-ui-react';
import { UCFirst } from '../utils/string';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TaskList = ({ refreshKey = 0, limit = 15, offset = 0 }) => {
  const [currentOffset, setCurrentOffset] = useState(offset);
  const [currentRefreshKey, setCurrentRefreshKey] = useState(refreshKey);
  const refresh = () => setCurrentRefreshKey(currentRefreshKey + 1);

  const data = useApiFetch(`api/tasks/?limit=${limit}&offset=${currentOffset}`, null, currentRefreshKey);

  if (data == null) {
    return <div>Loading</div>;
  }

  const { results, count, next, previous } = data;

  const pages = Math.ceil(count / limit);
  const currentPage = currentOffset / limit + 1;

  const callAction = (id, action) => apiFetch(`api/tasks/${id}/${action}`).then(() => refresh());
  const makeButtons = (id, actions) =>
    actions.map((action) => (
      <Button size="mini" key={action} onClick={() => callAction(id, action)}>
        {UCFirst(action)}
      </Button>
    ));

  return (
    <React.Fragment>
      <DragDropContext onDragEnd={(e) => console.log('drag end', e)}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {results.map(({ id, title, effort, state, available_state_transitions, position }, index) => (
                <Draggable key={id} draggableId={`${id}`} index={index}>
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <div>{title}</div>
                      <div>
                        <span>{`State: ${state}`}</span>
                        <span>{`Effort: ${effort || '-'}`}</span>
                        <span>{makeButtons(id, available_state_transitions)}</span>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
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

/*

*/
