import styled, { css } from 'styled-components';
import theme from 'style/theme';
import { font, label } from 'style/typography';

const commonStyles = css`
  font-family: ${font.base};
  border: none;
  border-radius: 3.6rem;
  padding: 1.5rem;
  width: 100%;
  cursor: pointer;
  color: ${theme.color.text.white};
  display: inline-block;
  text-align: center;

  &:disabled {
    opacity: 0.5;
  }

  &:hover {
    color: ${theme.color.text.white};
  }
`;

export const PrimaryButton = styled.button`
  ${commonStyles};
  background: ${theme.color.accent.primary};
`;

export const GhostButton = styled.button`
  ${commonStyles};
  background: rgb(0 0 0 / 30%);
`;

export const SecondaryButton = styled.button`
  ${commonStyles};
  background: ${theme.color.accent.secondary};
`;

export const OutlineButton = styled.button`
  ${commonStyles};
  ${label.small};
  font-weight: 500;
  border: 0.1rem solid ${theme.color.text.white};
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;

  svg {
    margin-right: 1rem;
  }
`;
