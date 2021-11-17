import styled, { css } from 'styled-components';
import theme from 'style/theme';
import mq from 'style/mq';
import { label } from 'style/typography';
import { PrimaryButton } from '@components/buttons';

export const Wrapper = styled.div`
  min-height: 100vh;
  background: ${theme.color.background.dark};
`;

export const Content = styled.div`
  max-width: 110rem;
  margin: 0 auto;

  ${mq.medium} {
    display: grid;
    grid-template-columns: 26rem 1fr;
  }
`;

export const Sidebar = styled.div`
  margin-top: -10rem;

  ${mq.medium} {
    margin-top: -16.3rem;
  }
`;

export const Profile = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  padding: 0 2rem;
  gap: 2rem;

  ${mq.medium} {
    display: block;
  }
`;

export const Details = styled.div`
  z-index: 1;
`;

export const Actions = styled.div`
  padding: 2rem;

  button,
  a {
    margin-bottom: 1rem;
  }
`;

export const Body = styled.div``;

export const Username = styled.h1`
  ${label.large};
  margin: 1.5rem 0;

  ${mq.medium} {
    text-align: center;
  }
`;

export const VerifiedLabel = styled.div`
  ${label.small};
  font-weight: 300;
  display: flex;
  align-items: center;
  padding-bottom: 2rem;

  svg {
    margin-right: 0.5rem;
  }

  ${mq.medium} {
    justify-content: center;
    border-bottom: 0.1rem solid ${theme.color.border};
  }
`;

export const Followers = styled.div`
  ${label.small};
  font-size: 1.3rem;
  font-weight: 500;
  text-align: center;
  padding: 2.5rem 0;
  border-bottom: 0.1rem solid ${theme.color.border};
  margin: 0 2rem;
  display: none;

  ${mq.medium} {
    display: block;
  }
`;

export const FollowerCount = styled.div`
  color: ${theme.color.accent.primary};
  margin-bottom: 1rem;
`;

const buttonStyles = css`
  ${label.small};
  font-weight: 500;
  color: ${theme.color.text.dark};
  margin-bottom: 1.5rem;

  &:hover {
    color: ${theme.color.text.dark};
  }
`;

export const SubscribeButton = styled(PrimaryButton)`
  ${buttonStyles};
`;

export const Message = styled.p`
  ${label.small};
  text-align: center;
`;
