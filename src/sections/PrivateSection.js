import React, { useState } from 'react';
import { useRouteMatch, Route, Switch, useLocation, Link } from 'react-router-dom';
import Nav from '../widgets/Nav';
import TaskSection from './TaskSection';
import { Spacer, Box } from '@chakra-ui/core';
import DashboardSection from './DashboardSection';
import SprintSection from './SprintSection';
import navStyles from '../styles/nav.css';

const PrivateSection = () => {
  const { path } = useRouteMatch();

  const getUrl = (slug) => {
    return `${path}/${slug}`.replace('//', '/');
  };

  const dashboardUrl = getUrl('');
  const tasksUrl = getUrl('tasks');
  const archivedTasksUrl = getUrl('tasks/archived');
  const sprintsUrl = getUrl('sprints');
  const groceriesUrl = getUrl('groceries');

  const menuItems = [
    { name: 'Dashboard', url: dashboardUrl },
    {
      name: 'ToDo',
      items: [
        { name: 'Tasks', url: tasksUrl },
        { name: 'Archive', url: archivedTasksUrl },
        {
          name: 'sub test',
          items: [
            { name: 'bob', url: 'bob' },
            { name: 'rat', url: 'rat' },
          ],
        },
        { name: 'Sprints', url: sprintsUrl },
      ],
    },
    { name: 'Groceries', url: groceriesUrl },
  ];

  const { pathname } = useLocation();

  return (
    <div>
      <Nav>
        <Nav.Block navItems={menuItems} />
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
      </Switch>
    </div>
  );
};

export default PrivateSection;
