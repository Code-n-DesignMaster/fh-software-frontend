import styled from 'styled-components';
import theme from 'style/theme';
import { label } from 'style/typography';

export const Wrapper = styled.section`
  margin-bottom: 2rem;
`;

export const Creator = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  align-items: center;
  margin-bottom: 2rem;
`;

export const Avatar = styled.img`
  width: 5.5rem;
  height: 5.5rem;
  object-fit: cover;
  border-radius: 1rem;
  border: 0.2rem solid ${theme.color.accent.primary};
`;

export const Username = styled.a`
  ${label.medium};
  font-size: 1.6rem;
  font-weight: 500;

  &:hover {
    color: ${theme.color.accent.primary};
  }
`;

export const Divider = styled.hr`
  margin: 1.5rem 0;
  border: none;
  border-bottom: 0.2rem solid ${theme.color.border};
`;

export const Description = styled.p`
  ${label.small};
`;

export const Tags = styled.ul`
  ${label.small};
  color: ${theme.color.accent.primary};
  display: flex;

  li {
    margin-right: 0.5rem;
  }
`;

export const Stats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
`;

export const ViewCount = styled.div`
  ${label.small};
`;

export const LikeButton = styled.button<{ active: boolean }>`
  background: none;
  border: none;
  ${label.small};
  cursor: pointer;
  display: flex;
  align-items: center;

  svg {
    color: ${(props) =>
      props.active ? theme.color.accent.primary : theme.color.text.white};
    margin-right: 0.5rem;
  }
`;
