import styled from 'styled-components';
import theme from 'style/theme';
import { heading } from 'style/typography';
import mq from 'style/mq';

export const Wrapper = styled.section`
  ${mq.medium} {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;

export const Left = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
    url(/contact.jpg);
  background-size: cover;
  display: none;

  ${mq.medium} {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Right = styled.div`
  background: ${theme.color.background.dark};
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

export const Inner = styled.div`
  max-width: 41rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  ${heading.h1};
`;

export const FormTitle = styled.h2`
  ${heading.h2};
  margin-bottom: 3rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 3rem;

  input {
    &:nth-child(1),
    &:nth-child(2) {
      max-width: 25rem;
    }
  }

  button {
    max-width: 25rem;
  }
`;
