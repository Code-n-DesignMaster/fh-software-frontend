import theme from 'style/theme';
import { paragraph } from 'style/typography';
import styled from 'styled-components';

export const Label = styled.label`
  display: flex;
  align-items: center;
  ${paragraph.regular};
  margin-bottom: 1rem;
  white-space: pre-wrap;

  input {
    position: absolute;
    width: 0;
    height: 0;
    clip-path: polygon(0 0, 0 0, 0 0);
  }

  a {
    color: ${theme.color.accent.secondary};
  }
`;

export const UI = styled.span`
  display: block;
  position: relative;
  width: 1.2em;
  height: 1.2em;
  border-radius: 0.4rem;
  margin-top: -0.2em;
  margin-right: 1rem;
  background: ${theme.color.background.white};

  input:checked + & {
    background: ${theme.color.accent.primary};
    border-color: ${theme.color.accent.primary};

    &::before {
      content: '';
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0.4em;
      height: 0.2em;
      margin-top: -0.04em;
      border-bottom: 2px solid white;
      border-left: 2px solid white;
      transform: translate(-50%, -50%) rotateZ(-45deg);
      box-sizing: content-box;
    }
  }

  label:hover input:not(:checked):hover + &,
  label:focus input:not(:checked):hover + &,
  input:not(:checked):hover + & {
    background: rgba(255, 255, 255, 0.7);
  }
`;
