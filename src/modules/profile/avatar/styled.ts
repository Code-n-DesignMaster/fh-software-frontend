import theme from 'style/theme';
import styled from 'styled-components';
import mq from 'style/mq';

export const Wrapper = styled.div`
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 1rem;
  box-shadow: 0 0 0 0.3rem ${theme.color.accent.primary};
  margin: 0 auto;
 
  ${mq.medium} {
    width: 20rem;
    height: 20rem;
  }

  .ant-image {
    .ant-image-img, .ant-image-mask {
      border-radius: 1rem;
    }
  }
`;

export const Overlay = styled.div`
  position: absolute;
  background-color: black;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12rem;
  height: 12rem;
  border-radius: 1rem;

  &:hover {
    opacity: 0.5;
  }

  ${mq.medium} {
    width: 20rem;
    height: 20rem;
  }
`;
