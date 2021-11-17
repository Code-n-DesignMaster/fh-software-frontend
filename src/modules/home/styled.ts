import styled from 'styled-components';
import theme from 'style/theme';
import mq from 'style/mq';

export const Wrapper = styled.div`
  min-height: 100vh;
  background: ${theme.color.background.dark};
`;

export const Inner = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  padding: 0 2rem;

  ${mq.medium} {
    padding: 0;
  }
`;

export const PerformerList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  ${mq.medium} {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 4rem;
  }
`;

export const AllCreators = styled.div`
  max-width: 20rem;
  margin: 5rem auto 0;
`;
