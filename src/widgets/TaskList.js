import React, { useState } from 'react';
import { useApiFetch } from '../utils/apiFetch';
import { Button, Pagination, Menu, List } from 'semantic-ui-react';

const TaskList = ({ refreshKey = 0, limit = 25, offset = 0 }) => {
  const [currentOffset, setCurrentOffset] = useState(offset);

  const data = useApiFetch(`api/tasks/?limit=${limit}&offset=${currentOffset}`, null, refreshKey);

  if (data == null) {
    return <div>Loading</div>;
  }

  const { results, count, next, previous } = data;

  const pages = Math.ceil(count / limit);
  const currentPage = currentOffset / limit + 1;

  return (
    <React.Fragment>
      <List>
        {results.map(({ id, title, effort }) => (
          <List.Item key={id} header={title} content={`Effort: ${effort || '-'}`} />
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
