import styled from 'styled-components';
import theme from 'style/theme';
import { label } from 'style/typography';
import { PrimaryButton } from '@components/buttons';

export const PreviewWrapper = styled.div`
  position: relative;
  border-radius: 2rem;
  overflow: hidden;
  padding-top: 56.25%;
`;

export const Preview = styled.img`
  width: 100%;
  filter: blur(2rem);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const PreviewControls = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const ActionButton = styled(PrimaryButton)`
  ${label.small};
  font-weight: 500;
  color: ${theme.color.text.dark};
  width: auto;
  min-width: 20rem;

  &:hover {
    color: ${theme.color.text.dark};
  }
`;

export const CTA = styled.p`
  ${label.large};
  text-align: center;
  margin: 1rem 0;
`;
