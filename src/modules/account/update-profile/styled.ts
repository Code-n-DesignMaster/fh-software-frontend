import styled from 'styled-components';
import mq from 'style/mq';

export const Wrapper = styled.div`
  margin-bottom: 9rem;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;

  ${mq.medium} {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 7rem;
    align-items: unset;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 2rem;

  input,
  select {
    max-width: 80%;
  }

  input:nth-child(4) {
    max-width: 100%;
  }

  button {
    margin-top: 3rem;
    max-width: 60%;
  }

  ${mq.medium} {
    padding: 0;
  }
`;
