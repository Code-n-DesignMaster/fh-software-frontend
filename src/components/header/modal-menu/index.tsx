import { FC } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Portal } from '@components/portal';
import useScrollLock from 'src/hooks/use-scroll-lock';
import { Overlay, Content, Title } from './styled';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalMenu: FC<Props> = ({ isOpen, onClose, children }) => {
  useScrollLock(isOpen);

  return (
    <Portal>
      <CSSTransition timeout={300} in={isOpen} unmountOnExit>
        <Overlay onClick={() => onClose()} />
      </CSSTransition>
      <CSSTransition timeout={300} in={isOpen} unmountOnExit>
        <Content role="dialog">
          <Title>Main Menu</Title>
          {children}
        </Content>
      </CSSTransition>
    </Portal>
  );
};

export default ModalMenu;
