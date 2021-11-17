import styled from 'styled-components';
import theme from 'style/theme';
import { heading } from 'style/typography';

export const Wrapper = styled.section`
  background: ${theme.color.background.dark};
  min-height: 100vh;
`;

export const Inner = styled.div`
  max-width: 78rem;
  margin: 0 auto;
`;

export const Title = styled.h1`
  ${heading.h2};
  text-align: center;
  margin: 4rem 0 4.5rem;
`;
