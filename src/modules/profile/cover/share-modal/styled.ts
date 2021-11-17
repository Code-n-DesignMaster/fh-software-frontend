import styled from 'styled-components';
import theme from 'style/theme';
import { paragraph } from 'style/typography';

export const Avatar = styled.img`
  width: 12rem;
  height: 12rem;
  border-radius: 1rem;
  box-shadow: 0 0 0 0.3rem ${theme.color.accent.primary};
  margin: 0 auto;
`;

export const Title = styled.p`
  margin: 2rem auto 2rem;
  ${paragraph.large};
  color: ${theme.color.text.dark};

  mark {
    background: none;
    color: ${theme.color.accent.primary};
    font-weight: 600;
  }
`;
