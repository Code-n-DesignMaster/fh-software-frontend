import styled from 'styled-components';
import { label } from 'style/typography';
import theme from 'style/theme';

export const CommentList = styled.ul``;

export const CommentItem = styled.li`
  display: grid;
  grid-template-columns: auto 1fr;
  margin-bottom: 0.5rem;
  gap: 1rem;
  background: ${theme.color.background.white};
  border-radius: 1rem;
  padding: 1.5rem;
`;

export const Avatar = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  object-fit: cover;
`;

export const Content = styled.p`
  ${label.regular};
  color: ${theme.color.text.dark};
  line-height: 1.8rem;
  margin: 0;
`;

export const Username = styled.div`
  ${label.regular};
  color: ${theme.color.text.dark};
  font-weight: 500;
  margin-bottom: 1rem;
  display: inline-block;
  margin-right: 1rem;
`;

export const Timestamp = styled.span`
  ${label.regular};
  color: ${theme.color.text.gray};
`;

export const Loading = styled.div`
  ${label.small};
  margin: 0.5rem 0 0;
`;

export const LoadMore = styled.button`
  ${label.small};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0.5rem 0 0;

  &:hover {
    color: ${theme.color.accent.primary};
  }
`;
