import styled from 'styled-components';
import PropTypes from 'prop-types';

const SListItem = styled.div`
  box-sizing: border-box;
  background-color: white;
  padding: 16px 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SListCheckbox = styled.div`
  flex-shrink: 1;
  input {
    display: none;
    &:default ~ span {
      background-color: gray;
    }
  }
  span {
    cursor: pointer;
    display: block;
    width: 16px;
    height: 16px;
    border: 1px solid #dbdbdb;
    border-radius: 6px;
  }
`;

const STextInput = styled.div`
  flex: 1;
  padding: 0 12px;
  input {
    display: block;
    width: 100%;
    padding: 0;
    border: 0;
    border-radius: 0;

    font-size: 16px;

    color: ${(props) =>
      props.state === 'TASK_ARCHIVED' ? '#adadad' : '#333333'};
  }
`;

const SPinTask = styled.div`
  cursor: pointer;
  width: 16px;
  height: 16px;
  border-radius: 50%;

  background-color: ${(props) =>
    props.state === 'TASK_PINNED' ? '#fff92d' : '#dbdbdb'};
`;

const Task = ({ task: { id, title, state }, onArchiveTask, onPinTask }) => (
  <SListItem>
    <SListCheckbox>
      <input
        type="checkbox"
        defaultChecked={state === 'TASK_ARCHIVED'}
        disabled={true}
        name="checked"
      />
      <span onClick={() => onArchiveTask(id)} />
    </SListCheckbox>
    <STextInput state={state}>
      <input type="text" value={title} readOnly={true} />
    </STextInput>
    {state !== 'TASK_ARCHIVED' && (
      <SPinTask state={state} onClick={() => onPinTask(id)} />
    )}
  </SListItem>
);

Task.propTypes = {
  /** Composition of the task */
  task: PropTypes.shape({
    /** Id of the task */
    id: PropTypes.string.isRequired,
    /** Title of the task */
    title: PropTypes.string.isRequired,
    /** Current state of the task */
    state: PropTypes.string.isRequired,
  }),
  /** Event to change the task to archived */
  onArchiveTask: PropTypes.func,
  /** Event to change the task to pinned */
  onPinTask: PropTypes.func,
};

export default Task;
