import styled from 'styled-components';
import theme from 'style/theme';
import { label } from 'style/typography';

export const Form = styled.form`
  margin-bottom: 2rem;
`;

export const Textarea = styled.textarea`
  ${label.regular};
  color: ${theme.color.text.dark};
  border-radius: 2rem;
  padding: 2rem;
  width: 100%;
`;
