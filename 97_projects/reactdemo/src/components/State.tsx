import { push } from 'connected-react-router';
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, useParams } from 'react-router-dom';

const StateChild = (props) => {
  const { stateChild } = useParams<any>();
  return (<div>{stateChild}</div>);
};
const State = (props) => {
  console.log(props.routerInfo);
  const handleClick = () => {
    // props.push('/add');
    props.history.push('/add');
  };
  return (<>
    {props.count}
    <button onClick={handleClick}>回到累计</button>
    <Router>
      <Route path="/count/:stateChild">
        <StateChild />
      </Route>
    </Router>
  </>);
};
const mapStateToProps = (state, props) => {
  return {
    count: state.one.count,
    routerInfo: state.router,
  };
};
export default connect(mapStateToProps, {push})(State);
