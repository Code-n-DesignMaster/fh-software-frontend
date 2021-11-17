import { heading } from 'style/typography';
import styled from 'styled-components';
import mq from 'style/mq';

export const Title = styled.h2`
  ${heading.h5};
  text-align: center;
`;

export const Form = styled.form`
  padding: 0 2rem 10rem;

  button {
    max-width: 30rem;
    margin: 3rem auto;
    display: block;
  }

  ${mq.medium} {
    padding: 0 10rem;
  }
`;

export const Inputs = styled.div`
  margin: 0 auto 1.5rem;

  ${mq.medium} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    padding: 1.5rem 0;
  }
`;
