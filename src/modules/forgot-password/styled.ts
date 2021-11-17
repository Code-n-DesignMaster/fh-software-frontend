import styled from 'styled-components';
import theme from 'style/theme';
import { heading, paragraph } from 'style/typography';
import mq from 'style/mq';

export const Wrapper = styled.div`
  ${mq.medium} {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;

export const Right = styled.div`
  background: ${theme.color.background.dark};
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

export const Left = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url(/password-reset.jpg);
  background-size: cover;
  display: none;
  background-position-y: 30%;

  ${mq.medium} {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Title = styled.h2`
  ${heading.h1};
  margin-bottom: 5rem;
`;

export const FormTitle = styled.h1`
  ${heading.h2};
  margin-bottom: 3rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 3rem;
`;

export const Paragraph = styled.p`
  ${paragraph.regular};
  text-align: center;

  a {
    color: ${theme.color.accent.secondary};
  }
`;

export const InnerRight = styled.div`
  max-width: 41rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InnerLeft = styled.div`
  max-width: 60rem;
`;

export const Text = styled.p`
  ${paragraph.large};
`;
