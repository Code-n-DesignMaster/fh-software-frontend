import styled from 'styled-components';
import theme from 'style/theme';
import mq from 'style/mq';
import { heading } from 'style/typography';

export const Wrapper = styled.div`
  background: ${theme.color.background.dark};
  overflow: hidden;
`;

export const Inner = styled.div`
  max-width: 112rem;
  margin: 0 auto;
`;

export const Title = styled.h1`
  ${heading.h2};
  margin: 4rem 0 3rem;
  display: none;

  ${mq.medium} {
    display: block;
  }
`;
