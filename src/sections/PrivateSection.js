import React from 'react';
import { useRouteMatch, Route, Switch, useLocation, Link, Redirect } from 'react-router-dom';
import { Menu, Button } from 'semantic-ui-react';
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
    <React.Fragment>
      <Menu>
        {menuItems.map((i) => {
            console.log(i.name, i.url, pathname);
          return (
            <Menu.Item as={Link} key={i.url} active={pathname.startsWith(i.url)} to={i.url}>
              {i.name}
            </Menu.Item>
          );
        })}
      </Menu>
      <Redirect exact from={path} to={dashboardUrl} />
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
    </React.Fragment>
  );
};

export default PrivateSection;