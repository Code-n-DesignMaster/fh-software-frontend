import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import moment from 'moment';
import useScrollLock from 'src/hooks/use-scroll-lock';
import { Portal } from '@components/portal';
import BellIcon from '@components/icons/bell';
import useNotifications from './use-notifications';
import { Button, Overlay, Content, Title, Item, Timestamp } from './styled';

const Tip = ({ data }) => (
  <Item>
    <BellIcon />
    <p>
      {data.userName} has tipped {data.performerName} ${data.amount}.{' '}
      {data.text && `Note: ${data.text}`}
    </p>
    <Timestamp>{moment(data.updatedAt).format('MMM. D, h:mm a')}</Timestamp>
  </Item>
);

const Message = ({ data }) => {
  const components = {
    tip: Tip
  };

  const Component = components[data.type];
  if (Component) {
    return <Component data={data} />;
  }
  return null;
};

const Notifications = () => {
  const [isOpen, setOpen] = useState(false);
  const { messages, getSystemMessages } = useNotifications();
  useScrollLock(isOpen);

  const handleOpen = async () => {
    await getSystemMessages();
    setOpen(true);
  };

  return (
    <>
      <Button onClick={handleOpen}>
        <BellIcon /> Notifications
      </Button>
      <Portal>
        <CSSTransition timeout={300} in={isOpen} unmountOnExit>
          <Overlay onClick={() => setOpen(false)} />
        </CSSTransition>
        <CSSTransition timeout={300} in={isOpen} unmountOnExit>
          <Content role="dialog">
            <Title>Notifications</Title>
            <ul>
              {messages.map((message) => (
                <Message key={message.id} data={message} />
              ))}
            </ul>
          </Content>
        </CSSTransition>
      </Portal>
    </>
  );
};

export default Notifications;
