import styled, { css } from 'styled-components';
import theme from 'style/theme';
import { label } from 'style/typography';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BubbleContainer = styled.div<{ isMine: boolean }>`
  justify-content: ${(props) => (props.isMine ? 'flex-end' : 'flex-start')};
  display: flex;
`;

export const Bubble = styled.div<{ isMine: boolean }>`
  margin: 0.5rem 0;
  padding: 0 1.5rem;
  max-width: 75%;
  ${(props) =>
    props.isMine
      ? css`
          border-right: 0.6rem solid ${theme.color.accent.secondary};
        `
      : css`
          border-left: 0.6rem solid ${theme.color.accent.primary};
        `}
`;

export const TextMessage = styled.div`
  width: 27rem;
  word-break: break-word;
  ${label.regular};
  line-height: 1.6rem;
`;

export const TipMessage = styled.div`
  align-items: center;
  display: flex;
  width: 27rem;

  & + ${TextMessage} {
    margin-top: 1rem;
  }
`;

export const GiveTipMessage = styled(TipMessage)`
  margin-top: 1rem;
`;

export const Timestamp = styled.div<{ isMine: boolean }>`
  ${label.small};
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  display: flex;

  ${(props) =>
    props.isMine
      ? css`
          margin-right: 2.1rem;
          justify-content: flex-end;
        `
      : css`
          margin-left: 2.1rem;
          justify-content: flex-start;
        `}
`;
