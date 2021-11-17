import styled from 'styled-components';
import Close from '@components/icons/close';
import theme from 'style/theme';

export const Overlay = styled.div`
  background: rgb(0 0 0 / 70%);
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  transition: opacity 0.2s;

  &.enter {
    opacity: 0;
  }

  &.enter-active {
    opacity: 1;
  }

  &.exit {
    opacity: 1;
  }

  &.exit-active {
    opacity: 0;
  }
`;

export const Content = styled.div`
  background: ${theme.color.background.white};
  padding: 7rem 5rem 5rem;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  overflow: auto;
  z-index: 4;
  max-width: 50rem;
  margin: 5rem auto 0;
  border-radius: 1rem;
  text-align: center;
  transition: all 0.2s ${theme.ease.out};

  &.enter {
    transform: translateY(100%);
    opacity: 0;
  }

  &.enter-active {
    transform: none;
    opacity: 1;
  }

  &.exit {
    transform: none;
    opacity: 1;
  }

  &.exit-active {
    transform: translateY(100%);
    opacity: 0;
  }
`;

export const Panel = styled.div``;

export const CloseIcon = styled(Close)`
  cursor: pointer;
  position: absolute;
  right: 2rem;
  top: 2rem;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: rotateZ(-90deg);
  }
`;
