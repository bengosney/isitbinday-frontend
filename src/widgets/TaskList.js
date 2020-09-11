import React, { useState } from 'react';
import apiFetch, { useApiFetch } from '../utils/apiFetch';
import { Button, Pagination, Menu, List, Grid } from 'semantic-ui-react';

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
      <Button size='mini' key={action} onClick={() => callAction(id, action)}>
        {action}
      </Button>
    ));

  return (
    <React.Fragment>
      <List>
        {results.map(({ id, title, effort, state, available_state_transitions }) => (
          <List.Item key={id}>
            <List.Header>{title}</List.Header>
            <List.Content>
              <Grid columns="equal">
                <Grid.Column width={2}>{`State: ${state}`}</Grid.Column>
                <Grid.Column width={2}>{`Effort: ${effort || '-'}`}</Grid.Column>
                <Grid.Column>{makeButtons(id, available_state_transitions)}</Grid.Column>
              </Grid>
            </List.Content>
          </List.Item>
        ))}
      </List>
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
