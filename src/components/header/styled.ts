import styled, { css, keyframes } from 'styled-components';
import theme from 'style/theme';
import { label } from 'style/typography';
import mq from 'style/mq';

const fadeInItems = keyframes`
  from {
    opacity: 0;
    transform: translateY(1rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Wrapper = styled.header<{ transparent: boolean }>`
  background: ${theme.color.background.dark};

  ${(props) =>
    props.transparent &&
    css`
      background: transparent;
      position: absolute;
      left: 0;
      right: 0;
    `}
`;

export const Inner = styled.div`
  height: 8.2rem;
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.img`
  width: 14rem;
  margin-left: 2rem;

  ${mq.medium} {
    margin: 0;
  }
`;

export const LinkList = styled.ul`
  margin: 0;
  display: none;

  ${mq.medium} {
    display: flex;
    align-items: center;
  }
`;

export const LinkItem = styled.li`
  display: flex;
  align-items: center;

  &:not(:last-child) {
    margin-right: 5rem;
  }

  a,
  button {
    ${label.regular};
    display: flex;
    align-items: center;

    &:hover {
      color: ${theme.color.accent.secondary};
    }

    svg {
      margin-right: 1rem;
    }
  }
`;

export const UserMenu = styled.div`
  position: relative;
  cursor: pointer;
`;

export const Backdrop = styled.div`
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
`;

export const Menu = styled.ul`
  display: block;
  position: absolute;
  min-width: 20rem;
  top: 100%;
  right: 0;
  white-space: nowrap;
  border-radius: 1rem;
  background: rgba(128, 128, 128, 0.5);
  backdrop-filter: blur(8px);
  z-index: 15000;

  li {
    display: block;
    padding: 0.5rem;
    opacity: 0;
    transform: translateY(1rem);
    animation: 0.3s ${fadeInItems} 0s ease-in-out forwards;

    a,
    button {
      ${label.regular};
      text-align: center;
      border: none;
      background: none;
      display: block;
      width: 100%;
      padding: 1rem 1.5rem;
      text-decoration: none;
      cursor: pointer;
      transition: background-color 0.4s;

      &:hover,
      &:focus {
        background-color: rgba(0, 0, 0, 0.3);
        color: ${theme.color.accent.secondary};
      }
    }
  }
`;

export const MobileButtons = styled.div`
  display: flex;
  align-items: center;
  ${mq.medium} {
    display: none;
  }
`;

export const MobileButton = styled.button`
  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  ${mq.medium} {
    width: 8.2rem;
  }
`;

export const Badge = styled.span`
  position: absolute;
  top: calc(50% - 25px);
  right: 2px;
  font-size: 14px;
  color: white;
`;

export const MobileLinks = styled.ul`
  li {
    margin-bottom: 1.5rem;

    a,
    button {
      ${label.regular};
      color: ${theme.color.text.dark};
      border: none;
      background: none;
      padding: 0;
    }
  }
`;

export const CartLink = styled.a`
  border: 0.1rem solid #777;
  border-radius: 5rem;
  padding: 1rem 2rem;

  mark {
    background: none;
    color: ${theme.color.accent.primary};
    font-size: 1.6rem;
    font-weight: 700;
    margin-left: 2rem;
  }
`;
