import theme from 'style/theme';
import mq from 'style/mq';
import styled, { css } from 'styled-components';

export const Wrapper = styled.div<{ editable: boolean; imageUrl: string }>`
  background-size: cover;
  position: relative;
  background-repeat: no-repeat;
  height: 14rem;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url(${(props) => props.imageUrl});

  ${(props) =>
    props.editable &&
    css`
      cursor: pointer;
    `}

  ${mq.medium} {
    height: 28rem;
  }
`;

export const Overlay = styled.div`
  position: absolute;
  background-color: black;
  opacity: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  &:hover {
    opacity: 0.5;
  }
`;

export const ShareWrapper = styled.div`
  height: auto;
  position: absolute;
  height: inherit;
  bottom: -50%;
  right: 0;
  ${mq.medium} {
    right: 20px;
    bottom: 0;
  }
  ${mq.large} {
    right: calc((100% - 110rem) / 2);
  }
`;

export const ShareButton = styled.button`
  background: ${theme.color.accent.primary};
  border: none;
  border-radius: 50%;
  width: 3.4rem;
  height: 3.4rem;
  cursor: pointer;
  position: absolute;
  right: 2rem;
  bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;

  ${mq.medium} {
    right: 0;
    bottom: 3rem;
  }
`;

export const WrapperPreviewCover = styled.div`
  background: rgb(0, 0, 0);
  height: inherit;
  width: 100%;
  .ant-image {
    height: inherit;
    width: inherit;
    .ant-image-img {
      height: inherit;
      width: inherit;
      object-fit: cover;
      opacity: 0.3;
    }
  }
`;
