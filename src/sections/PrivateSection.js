import React from 'react';
import { useRouteMatch, Route, Switch, useLocation, Link } from 'react-router-dom';
import Nav from '../widgets/Nav';
import TaskSection from './TaskSection';
import { Spacer } from '@chakra-ui/react';
import DashboardSection from './DashboardSection';
import SprintSection from './SprintSection';
import BookSection from './BookSection';

const PrivateSection = () => {
  const { path } = useRouteMatch();

  const getUrl = (slug) => {
    return `${path}/${slug}`.replace('//', '/');
  };

  const dashboardUrl = getUrl('');
  const tasksUrl = getUrl('tasks');
  const archivedTasksUrl = getUrl('tasks/archived');
  const sprintsUrl = getUrl('sprints');
  const booksUrl = getUrl('books');

  const menuItems = [
    { name: 'Dashboard', url: dashboardUrl },
    { name: 'Tasks', url: tasksUrl },
    { name: 'Books', url: booksUrl },
    // { name: 'Sprints', url: sprintsUrl },
  ];

  const { pathname } = useLocation();

  return (
    <div>
      <Nav>
        {menuItems.map((i) => {
          return (
            <Nav.Item as={Link} key={i.url} active={pathname.startsWith(i.url)} to={i.url}>
              {i.name}
            </Nav.Item>
          );
        })}
        <Spacer />
        <Nav.Item as={Link} to={'/logout'}>
          Logout
        </Nav.Item>
      </Nav>
      <Switch>
        <Route exact path={dashboardUrl}>
          <DashboardSection />
        </Route>
        <Route path={tasksUrl}>
          <TaskSection />
        </Route>
        <Route path={sprintsUrl}>
          <SprintSection />
        </Route>
        <Route path={booksUrl}>
          <BookSection />
        </Route>
      </Switch>
    </div>
  );
};

export default PrivateSection;
