import styled from 'styled-components';
import theme from 'style/theme';
import { heading, label } from 'style/typography';
import mq from 'style/mq';

export const Banner = styled.section`
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
    url(/faq.jpg);
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15rem 0;
`;

export const Title = styled.h1`
  ${heading.h2};
  text-transform: capitalize;
  text-align: center;
`;

export const Inner = styled.section`
  max-width: 120rem;
  margin: 0 auto;
  margin-top: -5rem;
  padding: 0 1rem;

  ${mq.medium} {
    padding: 0;
  }
`;

export const Panel = styled.div`
  border-radius: 1rem;
  background: ${theme.color.background.dark};
  overflow: hidden;
  padding: 3rem;

  ${mq.medium} {
    padding: 5rem;
  }
`;

export const Question = styled.h3`
  ${label.regular};
  font-weight: bold;
`;

export const Answer = styled.p`
  ${label.regular};
  line-height: 2.6rem;
  margin-bottom: 2rem;

  a {
    color: ${theme.color.accent.secondary};
  }
`;
