import { push } from 'connected-react-router';
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link, Route, useParams, useRouteMatch } from 'react-router-dom';

const TopicId = (props) => {
  const { topicId } = useParams<any>();
  const handleClick = () => {
    props.push('/count/123');
  };
  return (<div onClick={handleClick}>{topicId}</div>);
};

const WrappedTopicId = connect(null, {push})(TopicId);

const Dispatch = (props) => {
  const match = useRouteMatch();
  const handleClick = () => {
    props.add();
  };
  return (<>
    <button onClick={handleClick}>+</button>
    <Router>
      <Link to={`${match.url}/111`}>tt</Link>
      <Route path={`${match.url}/:topicId`}><WrappedTopicId /></Route>
    </Router>
  </>);
};
const mapDispatchToProps = (dispatch) => {
  return {
    add() {
      dispatch({
        type: 'add_count',
      });
    },
  };
};
export default connect(null, mapDispatchToProps)(Dispatch);
