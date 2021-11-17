import styled from 'styled-components';
import theme from 'style/theme';
import { label } from 'style/typography';
import mq from 'style/mq';

export const Wrapper = styled.footer``;

export const Links = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 3rem;

  ${mq.medium} {
    flex-direction: row;
  }
`;

export const LinkItem = styled.li`
  a {
    ${label.regular};
    color: ${theme.color.text.white};

    &:hover {
      color: ${theme.color.accent.secondary};
    }
  }

  ${mq.medium} {
    &:not(:last-child) {
      margin-right: 3rem;
    }
  }
`;

export const Copyright = styled.p`
  ${label.regular};
`;
