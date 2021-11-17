import styled, { keyframes } from 'styled-components';
import theme from 'style/theme';
import { heading, paragraph, font } from 'style/typography';
import mq from 'style/mq';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Wrapper = styled.section`
  min-height: 100vh;
  padding-top: 8rem;
  background: ${theme.color.background.dark};
  background-size: cover;
  display: flex;
  justify-content: center;
  background-position-x: 50%;
`;

export const Title = styled.h1`
  ${heading.h2};
  margin-bottom: 3rem;
`;

export const Inner = styled.div`
  margin-top: 12rem;
  text-align: center;
  opacity: 0;
  animation: 0.7s ${fadeIn} 0.2s ease-out forwards;
  padding: 0 2rem;

  ${mq.medium} {
    padding: 0;
  }
`;

export const Form = styled.form`
  max-width: 40rem;
  margin: 0 auto;

  input {
    &:nth-child(1) {
      border-radius: 1.2rem 1.2rem 0 0;
      border-bottom: 0.1rem solid #eee;
    }

    &:nth-child(2) {
      border-radius: 0 0 1.2rem 1.2rem;
    }
  }

  ${mq.medium} {
    button {
      max-width: 30rem;
    }
  }
`;

export const Actions = styled.div`
  padding: 1rem 4.5rem 0;
  display: flex;
  justify-content: space-between;
`;

export const Input = styled.input`
  width: 100%;
  border: none;
  padding: 2rem;
  background: ${theme.color.background.white};
  font-family: ${font.label};
`;

export const PasswordLink = styled.a`
  ${paragraph.regular};

  &:hover {
    color: ${theme.color.accent.secondary};
  }
`;

export const SignupActions = styled.div`
  margin: 7rem 0;

  a {
    width: 100%;
    margin-bottom: 1rem;
  }

  ${mq.medium} {
    a {
      width: 18rem;

      &:not(:last-child) {
        margin-right: 3.5rem;
      }
    }
  }
`;
