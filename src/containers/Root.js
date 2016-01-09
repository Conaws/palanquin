import React                    from 'react';
import { Provider }             from 'react-redux';
import routes                   from '../routes';
import { ReduxRouter }          from 'redux-router';
import DevTools                 from './DevTools';
import { createDevToolsWindow } from '../utils';
import {PatternImage}         from 'styles'


export default class Root extends React.Component {
  static propTypes = {
    store : React.PropTypes.object.isRequired,
    debug : React.PropTypes.bool,
    debugExternal : React.PropTypes.bool
  }

  static defaultProps = {
    debug : false,
    debugExternal : false
  }

  renderDevTools () {
    if (!this.props.debug) {
      return null;
    }

    return this.props.debugExternal ?
      createDevToolsWindow(this.props.store) : <DevTools />;
  }

  render () {
    return (
      <div  style={{ height: `100vh`, backgroundImage: `url(${PatternImage})`}}>
        <Provider store={this.props.store}>
          <div >
          <ReduxRouter>
            {routes}
          </ReduxRouter> 
          </div>
        </Provider>
      </div>
    );
  }
}

// {this.renderDevTools()}  
// 'you'd include this within the root component if you wanted to see the state as it progresses for a real project

          


