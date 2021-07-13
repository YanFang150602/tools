import {ConnectedRouter } from 'connected-react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import configureStore, { history } from './store';

import Dispatch from './components/Dispatch';
import State from './components/State';

const store = configureStore();

const APP = () => (
  <>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        {/* <Router> */}
          <Link to="/add">累计</Link>&nbsp;&nbsp;
          <Link to="/count">展示</Link>
          <br />
          <Route path="/add" component={Dispatch}></Route>
          <Route path="/count" component={State}></Route>
        {/* </Router> */}
      </ConnectedRouter>
    </Provider>
  </>
);

ReactDOM.render(<APP />, document.getElementById('root'));
