import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TaskList from './TaskList';

export const PureInboxScreen = ({ error }) => {
  if (error) return <div>Error!!</div>;

  return (
    <div>
      <h1>Task Boxs</h1>
      <TaskList />
    </div>
  );
};

PureInboxScreen.propTypes = {
  /** The error message */
  error: PropTypes.string,
};

PureInboxScreen.defaultProps = {
  error: null,
};

export default connect(({ error }) => ({ error }))(PureInboxScreen);
