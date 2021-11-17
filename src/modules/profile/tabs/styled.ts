import styled from 'styled-components';
import theme from 'style/theme';
import { label } from 'style/typography';
import mq from 'style/mq';

export const Nav = styled.ul`
  display: flex;
  flex-direction: row;
  padding: 2rem;
  border-top: 0.1rem solid ${theme.color.border};
  border-bottom: 0.1rem solid ${theme.color.border};

  ${mq.medium} {
    border-top: none;
    padding: 2rem 3rem;
  }
`;

export const NavItem = styled.li<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  ${label.small};
  font-weight: bold;
  align-items: center;
  justify-content: center;
  padding: 1rem 2.5rem;
  min-width: 10rem;
  border-radius: 2rem;
  cursor: pointer;
  background: ${(props) =>
    props.active ? theme.color.accent.primary : 'transparent'};
  color: ${(props) =>
    props.active ? theme.color.text.dark : theme.color.text.white};
`;

export const Content = styled.section`
  padding: 2rem;
  ${label.small};

  ${mq.medium} {
    border-left: 0.1rem solid ${theme.color.border};
    border-right: 0.1rem solid ${theme.color.border};
    padding: 2rem 3rem;
  }
`;

export const Icon = styled.div`
  margin-bottom: 0.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.strong`
  ${label.large};
  color: ${theme.color.accent.primary};
  font-size: 2.3rem;
  display: none;
  margin-bottom: 2rem;

  ${mq.medium} {
    display: inline-block;
  }
`;
