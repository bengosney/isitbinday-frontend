import React from 'react';
import { useRouteMatch, Route, Switch, useHistory } from 'react-router-dom';
import StockList from '../widgets/StockList';
import FAB from '../widgets/FAB';
import { MdAdd } from 'react-icons/md';
import { Heading, Stack } from '@chakra-ui/react';
import usePageTitle from '../utils/usePageTitle';

const ProductSection = () => {
  usePageTitle('Product List');
  const { path } = useRouteMatch();

  const getUrl = (slug) => {
    return `${path}/${slug}`.replace('//', '/');
  };

  const listUrl = getUrl('');
  const newUrl = getUrl('new');
  const archiveUrl = getUrl('archived');

  const history = useHistory();

  return (
    <React.Fragment>
      <Heading>Stock</Heading>
      <Switch>
        <Route path={listUrl}>
          <Stack my={6}>
            <StockList />
          </Stack>
        </Route>
      </Switch>
    </React.Fragment>
  );
};

export default ProductSection;
