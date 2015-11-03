import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import actionCreators         from 'actions';
import {Link}                 from 'react-router';
import * as _ from 'ramda';
import * as l from 'lodash-fp';


const flatButton = {paddingTop: 12, margin:20, width: '20%', marginLeft: 'auto', marginRight: 'auto', minHeight: 50, border: "1px solid black", borderRadius: 5}

// We define mapStateToProps and mapDispatchToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  counter : state.counter,
  poem : state.poem,
  routerState : state.router,
  poemlist : state.poemlist
});

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(actionCreators, dispatch)
});


export class HomeView extends React.Component {
  static propTypes = {
    actions  : React.PropTypes.object,
    counter  : React.PropTypes.number,
    poem     : React.PropTypes.object,
    poemlist : React.PropTypes.array
  }

  render () {
    return (
      <div className='container text-center'>
        {this.props.poemlist.map((p) => {
          return <div style={flatButton}>
            <Link  to={`/poems/${p.title}`} onClick={() =>  this.props.actions.poemLoad(p)}>{p.title}</Link>
          </div>
        })}
        <div style={flatButton}>
          <Link to="/new"> New Poem</Link>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
