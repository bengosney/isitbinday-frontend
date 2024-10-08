import ColorMode from '../widgets/ColorMode';
import MaxWidth from '../widgets/MaxWidth';
import Nav from '../widgets/Nav';
import BookSection from './BookSection';
import DashboardSection from './DashboardSection';
import RecipeSection from './RecipeSection';
import SprintSection from './SprintSection';
import TaskSection from './TaskSection';
import { Spacer } from '@chakra-ui/react';
import React from 'react';
import { useRouteMatch, Route, Switch, useLocation, Link } from 'react-router-dom';

const PrivateSection = () => {
  const { path } = useRouteMatch();

  const getUrl = (slug) => {
    return `${path}/${slug}`.replace('//', '/');
  };

  const dashboardUrl = getUrl('');
  const tasksUrl = getUrl('tasks');
  const sprintsUrl = getUrl('sprints');
  const booksUrl = getUrl('books');
  const recipeUrl = getUrl('recipes');

  const menuItems = [
    { name: 'Dashboard', url: dashboardUrl },
    { name: 'Tasks', url: tasksUrl },
    { name: 'Books', url: booksUrl },
    { name: 'Recipes', url: recipeUrl },
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
        <Spacer minWidth={10} />
        <ColorMode />
        <Nav.Item as={Link} to={'/logout'}>
          Logout
        </Nav.Item>
      </Nav>
      <MaxWidth marginTop={4}>
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
          <Route path={recipeUrl}>
            <RecipeSection />
          </Route>
        </Switch>
      </MaxWidth>
    </div>
  );
};

export default PrivateSection;
