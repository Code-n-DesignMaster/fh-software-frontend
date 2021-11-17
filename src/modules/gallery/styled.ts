import styled from 'styled-components';
import theme from 'style/theme';
import { label } from 'style/typography';
import mq from 'style/mq';

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
  }
`;

export const GallerySection = styled.div`
  min-width: 0;

  .carousel-status {
    display: none;
  }
`;

export const Aside = styled.div`
  padding: 0 2rem;

  ${mq.medium} {
    padding: 0;
  }
`;

export const Title = styled.h1`
  ${label.small};
  font-weight: 500;
  margin: 2rem 0;
  text-align: center;

  ${mq.medium} {
    text-align: left;
  }
`;
