import styled, { keyframes } from 'styled-components';
import theme from 'style/theme';

const one = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

const two = keyframes`
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
`;

const three = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`;

export const Wrapper = styled.div`
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(1, 1, 1, 0.8);
`;

export const Ellipsis = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: ${theme.color.accent.primary};
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }

  div:nth-child(1) {
    left: 8px;
    animation: ${one} 0.6s infinite;
  }
  div:nth-child(2) {
    left: 8px;
    animation: ${two} 0.6s infinite;
  }
  div:nth-child(3) {
    left: 32px;
    animation: ${two} 0.6s infinite;
  }
  div:nth-child(4) {
    left: 56px;
    animation: ${three} 0.6s infinite;
  }
`;
