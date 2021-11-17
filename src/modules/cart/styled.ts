import styled from 'styled-components';
import theme from 'style/theme';
import mq from 'style/mq';
import { heading, label } from 'style/typography';

export const Wrapper = styled.div`
  background: ${theme.color.background.dark};
  overflow: hidden;
`;

export const Inner = styled.div`
  max-width: 112rem;
  margin: 0 auto;

  ${mq.medium} {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 8rem;
    margin-top: 5rem;
  }
`;

export const Title = styled.h1`
  ${heading.h2};
`;

export const Paragraph = styled.p`
  ${label.small};
  margin-bottom: 2rem;
`;

export const TableWrapper = styled.div`
  padding: 0 2rem;

  ${mq.medium} {
    padding: 0;
  }
`;

export const Footer = styled.div`
  display: none;
  padding-top: 5rem;
  max-width: 25rem;

  ${mq.medium} {
    display: block;
  }
`;
