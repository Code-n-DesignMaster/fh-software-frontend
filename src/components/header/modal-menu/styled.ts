import styled from 'styled-components';
import theme from 'style/theme';
import { label } from 'style/typography';

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
  transition: transform 0.2s ${theme.ease.out};

  &.enter {
    transform: translateX(100%);
  }

  &.enter-active {
    transform: none;
  }

  &.exit {
    transform: none;
  }

  &.exit-active {
    transition-timing-function: ${theme.ease.in};
    transform: translateX(100%);
  }

  position: fixed;
  right: 0;
  top: 0;
  overflow: auto;
  z-index: 4;
  width: 25rem;
  height: 100%;
  background: ${theme.color.background.white};
  padding: 2rem;
`;

export const Title = styled.p`
  ${label.medium};
  color: ${theme.color.text.dark};
  font-weight: 500;
  border-bottom: 0.1rem solid ${theme.color.text.dark};
  padding-bottom: 2rem;
  margin-bottom: 2rem;
`;
