import React                 from 'react';
import { Route, IndexRoute } from 'react-router';
import CoreLayout            from 'layouts/CoreLayout';
import HomeView              from 'views/HomeView';
import HomeView2			 from 'views/palanquin';
import Map 					 from 'components/Map'
import TodosView       		 from 'views/TodoMotion';


export default (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={HomeView}/>
    <Route path="map" component={Map}/>
    <Route path="todoeasteregg" component={TodosView}/>
  </Route>
);
