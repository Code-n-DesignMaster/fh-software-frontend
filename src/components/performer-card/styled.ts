import styled from 'styled-components';
import { label } from 'style/typography';
import theme from 'style/theme';

export const Picture = styled.img`
  width: 100%;
  border-radius: 2rem;
`;

export const Wrapper = styled.div`
  &:hover {
    ${Picture} {
      box-shadow: 0 0 0 0.3rem ${theme.color.accent.primary};
    }
  }
`;

export const Details = styled.div`
  padding-top: 2rem;
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: 1rem;
`;

export const Left = styled.div`
  overflow: hidden;
`;

export const Right = styled.div``;

export const Username = styled.p`
  ${label.medium};
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  .verified {
    vertical-align: middle;
    margin-top: 3px;
  }
  .verified > path {
    fill: #FAA61A;
  }
`;

export const Counter = styled.div`
  ${label.small};
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  font-weight: 600;

  svg {
    margin-right: 1rem;
  }
`;

export const LastSeen = styled.span<{ active: boolean }>`
  ${label.small};
  font-weight: 400;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
    
  &:before {
    display: inline-block;
    border-radius: 50%;
    content: ' ';
    width: 1.2rem;
    height: 1.2rem;
    margin-right: 0.5rem;
    vertical-align: middle;
    background: ${(props) =>
      props.active ? theme.color.accent.green : theme.color.accent.primary};
  }
`;
