import theme from 'style/theme';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1.2rem;
  align-items: center;
`;

export const PreviewWrapper = styled.div`
  width: 8rem;
  height: 8rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;
`;

export const Preview = styled.img`
  width: inherit;
  height: inherit;
  filter: blur(2rem);
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  svg {
    transform: scale(0.7);
  }
`;

export const Category = styled.span`
  color: ${theme.color.accent.primary};
  font-size: 1.4rem;
  display: block;
  margin-top: 0.5rem;
`;
