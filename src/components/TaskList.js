import styled from 'styled-components';
import PropTypes from 'prop-types';
import Task from './Task';
import { connect } from 'react-redux';
import { archiveTask, pinTask } from '../lib/redux';

const SListItems = styled.div`
  background-color: white;
  min-height: 280px;
`;

const SLoadingList = styled.div`
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  animation: blinkAnim 0.7s infinite alternate;

  .glow_checkbox,
  .glow_text span {
    background-color: #dbdbdb;
    color: #dbdbdb;
  }
  .glow_checkbox {
    margin-right: 12px;

    width: 16px;
    height: 16px;
  }
  .glow_text {
    flex: 1;
    font-size: 16px;
    line-height: 1;
    span {
      margin-right: 8px;
    }
  }

  @keyframes blinkAnim {
    from {
      opacity: 0.4;
    }
    to {
      opacity: 1;
    }
  }
`;

export const PureTaskList = ({ loading, tasks, onPinTask, onArchiveTask }) => {
  const events = {
    onPinTask,
    onArchiveTask,
  };

  const loadingRow = (
    <SLoadingList>
      <span className="glow_checkbox"></span>
      <span className="glow_text">
        <span>Loading</span>
        <span>cool</span>
        <span>state</span>
      </span>
    </SLoadingList>
  );

  if (loading)
    return (
      <SListItems>
        {loadingRow}
        {loadingRow}
        {loadingRow}
        {loadingRow}
      </SListItems>
    );

  if (tasks.length === 0) return <SListItems>Empty</SListItems>;

  const tasksInOrder = [
    ...tasks.filter((t) => t.state === 'TASK_PINNED'),
    ...tasks.filter((t) => t.state !== 'TASK_PINNED'),
  ];

  return (
    <SListItems>
      {tasksInOrder.map((task) => (
        <Task key={task.id} task={task} {...events} />
      ))}
    </SListItems>
  );
};

PureTaskList.propTypes = {
  loading: PropTypes.bool,
  tasks: PropTypes.arrayOf(Task.propTypes.task).isRequired,
  onPinTask: PropTypes.func.isRequired,
  onArchiveTask: PropTypes.func.isRequired,
};

PureTaskList.defaultProps = {
  loading: false,
};

const connectMapState = ({ tasks }) => ({
  tasks,
  //   tasks: tasks.filter(
  //     (t) => t.state === 'TASK_INBOX' || t.state === 'TASK_PINNED',
  //   ),
});

const connectDispatch = (dispatch) => ({
  onArchiveTask: (id) => dispatch(archiveTask(id)),
  onPinTask: (id) => dispatch(pinTask(id)),
});

export default connect(connectMapState, connectDispatch)(PureTaskList);
