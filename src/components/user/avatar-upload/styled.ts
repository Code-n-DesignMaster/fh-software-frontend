import styled from 'styled-components';
import theme from 'style/theme';
import { paragraph } from 'style/typography';

export const Wrapper = styled.div`
  border: 0.2rem solid ${theme.color.accent.primary};
  border-radius: 1rem;
  width: 22rem;
  height: 22rem;
  position: relative;
  overflow: hidden;
  margin-bottom: 3rem;

  .ant-upload {
    background: #222;
    color: ${theme.color.text.white};
    font-size: 5rem;
  }

  .ant-upload-picture-card-wrapper {
    height: 100%;
  }

  .ant-upload-select-picture-card {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

export const Image = styled.img`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

export const Overlay = styled.div`
  position: absolute;
  background-color: black;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  color: ${theme.color.text.white};
  font-size: 5rem;

  &:hover {
    opacity: 0.5;
  }
`;

export const Text = styled.p`
  text-align: center;
  ${paragraph.medium};
`;
