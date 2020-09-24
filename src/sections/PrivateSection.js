import React from 'react';
import { useRouteMatch, Route, Switch, useLocation, Link, Redirect } from 'react-router-dom';
import { Menu,  Container } from 'semantic-ui-react';
import Nav from '../widgets/Nav';
import TaskSection from './TaskSection';

const PrivateSection = () => {
  const { path } = useRouteMatch();

  const getUrl = (slug) => {
    return `${path}/${slug}`.replace('//', '/');
  };

  const dashboardUrl = getUrl('dashboard');
  const tasksUrl = getUrl('tasks');
  const sprintsUrl = getUrl('sprints');

  const menuItems = [
    { name: 'Dashboard', url: dashboardUrl },
    { name: 'Tasks', url: tasksUrl },
    { name: 'Sprints', url: sprintsUrl },
  ];

  const { pathname } = useLocation();



  return (
    <Container>
      <Nav>
        {menuItems.map((i) => {
          return (
            <Nav.Item as={Link} key={i.url} active={pathname.startsWith(i.url)} to={i.url}>
              {i.name}
            </Nav.Item>
          );
        })}
      </Nav>
      <Switch>
        <Route path={dashboardUrl}>
          <h1>dashboard</h1>
        </Route>
        <Route path={tasksUrl}>
          <TaskSection />
        </Route>
        <Route path={sprintsUrl}>
          <h1>Sprints</h1>
        </Route>
      </Switch>
    </Container>
  );
};

export default PrivateSection;