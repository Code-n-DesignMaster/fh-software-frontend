import { Story, Meta } from '@storybook/react';
import ConversationListItem, { Props } from '.';

export default {
  title: 'ConversationListItem',
  component: ConversationListItem
} as Meta;

export const simple: Story<Props> = (args) => (
  <ConversationListItem {...args} />
);

simple.args = {
  data: {
    recipientInfo: {
      _id: '1',
      name: 'Creator',
      username: 'creator',
      isOnline: false
    },
    _id: '1',
    totalNotSeenMessages: 2,
    lastMessage: '<p>Hello, <b>user</b>!</p>'
  },
  setActive: () => ({}),
  selected: false
};
