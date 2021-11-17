import styled from 'styled-components';
import mq from 'style/mq';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 90rem;
  gap: 2rem;

  ${mq.medium} {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export const Centered = styled.div`
  width: 30rem;
  margin: 5rem auto;
`;
