import React from 'react';
import { connect } from 'react-redux';
import * as _ from 'ramda';
import { compose, mapProps, renameProp } from 'recompose';
import {trace} from 'actions/helpers';

// const connect = _.curryN(2, connect);

const TodosView = ({ myCounter, poem }) => (
  <div>
    <h1>Foo {myCounter}</h1>
    {poem.stanzas.map()}
  </div>
);


const TodosViewContainer = compose(
  connect(({ counter, poem }) => ({ counter, poem })),
  renameProp('counter', 'myCounter')
)(TodosView);
export default TodosViewContainer;

//	are you composing components into mapProps or in the todos render Method
