import styled from 'styled-components';
import theme from 'style/theme';
import { paragraph } from 'style/typography';

export const Overlay = styled.div`
  background: rgb(0 0 0 / 70%);
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
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

  button,
  a {
    margin-bottom: 1rem;
  }
`;

export const Message = styled.p`
  ${paragraph.large};
  color: ${theme.color.text.dark};
  text-align: center;
  margin-bottom: 3rem;
`;
