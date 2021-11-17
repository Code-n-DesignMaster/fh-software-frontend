import { FC, useState } from 'react';
import cookie from 'js-cookie';
import { Portal } from '@components/portal';
import { PrimaryButton, GhostButton } from '@components/buttons';
import { Overlay, Content, Message } from './styled';

const AccessPopup: FC = ({ children }) => {
  const [confirmed, setConfirmed] = useState(
    cookie.get('ageConfirmed') === 'true'
  );

  const onConfirm = () => {
    const date = new Date();
    date.setDate(date.getDate() + 365);
    cookie.set('ageConfirmed', 'true', { expires: date, path: '/' });
    localStorage.setItem('ageConfirmed', 'true');
    setConfirmed(true);
  };

  if (confirmed) {
    return <>{children}</>;
  }

  return (
    <Portal>
      <Overlay />
      <Content role="dialog">
        <Message>
          We got a lot of cool stuff going on here! But first.. are you 18?
        </Message>
        <PrimaryButton type="button" onClick={onConfirm}>
          Yes, I confirm
        </PrimaryButton>
        <GhostButton as="a" href="https://google.com">
          No, leave the website
        </GhostButton>
      </Content>
    </Portal>
  );
};

export default AccessPopup;
