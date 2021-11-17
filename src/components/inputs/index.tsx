import styled, { css } from 'styled-components';
import theme from 'style/theme';
import { font } from 'style/typography';

const commonStyles = css`
  background: ${theme.color.background.white};
  border: none;
  border-radius: 5rem;
  padding: 1rem;
  width: 100%;
  margin-bottom: 1rem;
  font-family: ${font.base};
  font-size: 1.4rem;
  text-align: center;
  outline: none;

  &::placeholder {
    text-align: center;
    color: ${theme.color.text.gray};
  }

  &:focus {
    box-shadow: 0 0 0 0.2rem ${theme.color.accent.primary};
  }
`;

export const TextInput = styled.input`
  ${commonStyles};
`;

export const TextArea = styled.textarea`
  ${commonStyles};
  border-radius: 2rem;
  text-align: unset;
`;

export const Select = styled.select`
  ${commonStyles};
  appearance: none;
  text-align-last: center;
  background: white url('/chevron-down.png') no-repeat right 1rem center;
`;

export { default as Checkbox } from './checkbox';
export { default as DatePicker } from './date-picker';
