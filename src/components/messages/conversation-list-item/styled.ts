import theme from 'style/theme';
import { label } from 'style/typography';
import styled from 'styled-components';

export const Wrapper = styled.li<{ active: boolean }>`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  padding: 1.5rem 1rem;
  position: relative;
  color: ${theme.color.text.white};
  border-bottom: 1px solid ${theme.color.border};
  background: ${(props) => (props.active ? '#D1D3D4' : 'none')};
  cursor: pointer;

  &:hover {
    background: ${theme.color.accent.primary};
  }
`;

export const AvatarWrapper = styled.div`
  position: relative;
  margin-right: 2rem;
`;

export const Avatar = styled.img`
  width: 5.5rem;
  height: 5.5rem;
  border-radius: 1rem;
  object-fit: cover;
  border: 0.2rem solid ${theme.color.accent.primary};
`;

export const Info = styled.div``;

export const Username = styled.strong`
  ${label.medium};
  font-weight: 500;
`;

export const Unseen = styled.span`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background: ${theme.color.accent.secondary};
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
`;
