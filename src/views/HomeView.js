import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import actionCreators         from 'actions';
import {Link}                 from 'react-router';
import {flatButton}           from 'styles';
import * as _ from 'ramda';
import * as l from 'lodash-fp';



// We define mapStateToProps and mapDispatchToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html

const mapStateToProps = (state) => ({
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
    poem     : React.PropTypes.object,
    poemlist : React.PropTypes.array
  }

  render () {
    let {poemLoad} = this.props.actions;
    return (
      <div className='container text-center'>
        <div>
        {this.props.poemlist.map((p) => {
          return <Link to={`/poems/${p.title}`} onClick={() => poemLoad(p)}>
              <div style={flatButton}>
                {p.title}
              </div>
            </Link>
        })}
        </div>
          <Link to="/new"><div style={flatButton}> New Poem</div></Link>
        
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
