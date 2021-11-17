import styled from 'styled-components';
import theme from 'style/theme';
import { heading } from 'style/typography';
import mq from 'style/mq';

export const Wrapper = styled.section`
  min-height: 100vh;
  background: ${theme.color.background.dark};
  display: flex;
  justify-content: center;
  padding-top: 8rem;
`;

export const Inner = styled.div`
  max-width: 41rem;
  padding: 0 2rem;

  ${mq.medium} {
    padding: 0;
  }
`;

export const Title = styled.h1`
  ${heading.h2};
  margin-bottom: 3rem;
  text-align: center;
`;
