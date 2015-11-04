import React                 from 'react';
import { Route, IndexRoute } from 'react-router';
import CoreLayout            from 'layouts/CoreLayout';
import HomeView              from 'views/HomeView';
import Poem			         from 'components/Poem';
import PoemForm				 from 'components/PoemForm';
import TodosView       		 from 'views/TodosView';

export default (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={HomeView} />
    <Route path="poems/:title" component={Poem} onEnter={console.log('You Like Poetry huh')}></Route >
    <Route path="new" component={PoemForm}/>
  </Route>
);
