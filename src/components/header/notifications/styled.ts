import styled from 'styled-components';
import { label } from 'style/typography';
import theme from 'style/theme';

export const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

export const Item = styled.li`
  ${label.small};
  color: ${theme.color.text.dark};
  border-bottom: 0.1rem solid ${theme.color.text.dark};
  padding-bottom: 2rem;
  margin-bottom: 2rem;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  position: relative;

  svg {
    path {
      fill: ${theme.color.text.dark};
    }
  }
`;

export const Timestamp = styled.span`
  position: absolute;
  right: 0;
  bottom: 1rem;
  font-size: 0.9rem;
  color: ${theme.color.text.gray};
`;

export { Overlay, Content, Title } from '../modal-menu/styled';
