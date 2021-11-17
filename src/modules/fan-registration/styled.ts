import styled from 'styled-components';
import theme from 'style/theme';
import { heading, paragraph } from 'style/typography';
import mq from 'style/mq';

export const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column-reverse;

  ${mq.medium} {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;

export const Left = styled.div`
  background: ${theme.color.background.dark};
  display: flex;
  align-items: center;
  justify-content: center;

  ${mq.medium} {
    padding-top: 10rem;
  }
`;

export const Right = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url(/fan-register.jpg);
  background-size: cover;
  background-position-y: 40%;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 10rem 3rem 3rem;

  ${mq.medium} {
    padding: 0;
  }
`;

export const Benefits = styled.div`
  width: 100%;

  ${mq.medium} {
    width: unset;
  }
`;

export const Title = styled.h2`
  ${heading.h3};

  ${mq.medium} {
    ${heading.h1};
  }
`;

export const BenefitList = styled.ul`
  ${paragraph.regular};

  li {
    margin-bottom: 0.5rem;
  }

  ${mq.medium} {
    ${paragraph.large};

    li {
      margin-bottom: 1.5rem;
    }
  }
`;

export const Inner = styled.div`
  max-width: 41rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2rem;

  ${mq.medium} {
    padding: 0;
  }
`;

export const FormTitle = styled.h1`
  ${heading.h2};
  margin-bottom: 3rem;
  margin-top: 5rem;

  ${mq.medium} {
    margin-top: 0;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 3rem;

  input:nth-child(1),
  input:nth-child(2),
  input:nth-child(3),
  input:nth-child(6),
  input:nth-child(7),
  select {
    max-width: 80%;
  }
`;

export const CaptchaWrapper = styled.div`
  margin-bottom: 1rem;
`;

export const Paragraph = styled.p`
  ${paragraph.regular};

  a {
    color: ${theme.color.accent.secondary};
  }
`;
