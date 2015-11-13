import React                 from 'react';
import { Route, IndexRoute } from 'react-router';
import CoreLayout            from 'layouts/CoreLayout';
import HomeView              from 'views/HomeView';
import HomeView2			 from 'views/palanquin';
import Poem			         from 'components/Poem';
import Line 				 from 'components/transition';
import PoemForm				 from 'components/PoemForm';
import TodosView       		 from 'views/TodosView';
import Demo 				 from 'views/TodoMotion';


export default (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={Demo}/>
    <Route path="poems/:title" component={Poem} onEnter={console.log('You Like Poetry huh')}>
    	<Route path=":line"component={Line} />
    	<Route path="new" component={PoemForm}/>
    </Route >
    <Route path="new" component={PoemForm}/>

  </Route>
);
