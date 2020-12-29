import { Provider } from 'react-redux';
import { store } from '../lib/redux';
import { PureInboxScreen } from './InboxScreen';

const storiesState = {
  component: PureInboxScreen,
  title: 'InboxScreen',
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
};

export default storiesState;

const Template = (args) => <PureInboxScreen {...args} />;

export const Default = Template.bind({});

export const Error = Template.bind({});
Error.args = {
  error: 'Somthing',
};
