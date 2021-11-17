import styled from 'styled-components';
import theme from 'style/theme';
import { label } from 'style/typography';

export const Wrapper = styled.div`
  ${label.small};
  background: ${theme.color.accent.primary};
  padding: 2rem;
  width: 100%;
  margin-bottom: 1rem;
  border-radius: 1rem;
`;
