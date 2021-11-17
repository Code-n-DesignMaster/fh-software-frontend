import theme from 'style/theme';
import { label } from 'style/typography';
import styled from 'styled-components';

export const Wrapper = styled.div`
  color: ${theme.color.text.white};
  text-align: center;
`;

export const Preview = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
  height: 18rem;

  img,
  canvas {
    width: 100% !important;
    height: 18rem !important;
    border-radius: 1rem;
    object-fit: cover;
  }
`;

export const StyledLink = styled.a`
  overflow: hidden;
`;

export const PreviewInner = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const Title = styled.div`
  ${label.small};
  font-size: 1.3rem;
  font-weight: 500;
  margin-bottom: 1rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const Price = styled.div`
  ${label.small};
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    margin-right: 0.5rem;
  }
`;

export const NumText = styled.span`
  font-size: 1rem;
`;
