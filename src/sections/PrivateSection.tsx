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
import { Route, Routes, useLocation, Link } from 'react-router-dom';

interface MenuItem {
  name: string;
  url: string;
}

const PrivateSection = () => {
  const getUrl = (slug: string) => {
    return `/iibd/${slug}`.replace(/\/$/, '');
  };

  const dashboardUrl = getUrl('');
  const tasksUrl = getUrl('tasks');
  const booksUrl = getUrl('books');
  const recipeUrl = getUrl('recipes');

  const menuItems: MenuItem[] = [
    { name: 'Dashboard', url: dashboardUrl },
    { name: 'Tasks', url: tasksUrl },
    { name: 'Books', url: booksUrl },
    { name: 'Recipes', url: recipeUrl },
    // { name: 'Sprints', url: getUrl('sprints') },
  ];

  const { pathname } = useLocation();

  const isActive = (url: string) => (url === dashboardUrl ? pathname === url : pathname.startsWith(url));

  return (
    <div>
      <Nav>
        <Nav.Brand />
        {menuItems.map((i) => {
          return (
            <Nav.Item as={Link} key={i.url} active={isActive(i.url)} to={i.url}>
              {i.name}
            </Nav.Item>
          );
        })}
        <Spacer minWidth={6} />
        <ColorMode />
        <Nav.Item as={Link} to={'/logout'}>
          Log out
        </Nav.Item>
      </Nav>
      <MaxWidth marginTop={4}>
        <Routes>
          <Route index element={<DashboardSection />} />
          <Route path="tasks/*" element={<TaskSection />} />
          <Route path="sprints/*" element={<SprintSection />} />
          <Route path="books/*" element={<BookSection />} />
          <Route path="recipes/*" element={<RecipeSection />} />
        </Routes>
      </MaxWidth>
    </div>
  );
};

export default PrivateSection;
