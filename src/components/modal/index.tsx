import { FC } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Portal } from '@components/portal';
import { Overlay, Content, Panel, CloseIcon } from './styled';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const Modal: FC<Props> = ({ isOpen, onClose, children }) => (
  <Portal>
    <CSSTransition timeout={300} in={isOpen} unmountOnExit>
      <Overlay onClick={() => onClose()} />
    </CSSTransition>
    <CSSTransition timeout={300} in={isOpen} unmountOnExit>
      <Content role="dialog">
        <CloseIcon onClick={() => onClose()} />
        <Panel>{children}</Panel>
      </Content>
    </CSSTransition>
  </Portal>
);

export default Modal;
