import styled from 'styled-components';
import theme from 'style/theme';
import { label } from 'style/typography';
import mq from 'style/mq';

export const Table = styled.table`
  ${label.medium};
  width: 100%;
`;

export const Head = styled.thead`
  border-bottom: 0.1rem solid #333;
  ${label.small};

  th {
    padding: 1rem 0;
    font-weight: 400;
    display: none;

    &:last-child {
      display: table-cell;
    }
  }

  ${mq.medium} {
    th {
      display: table-cell;

      &:last-child {
        text-align: right;
      }
    }
  }
`;

export const Body = styled.tbody`
  tr {
    border-bottom: 0.1rem solid #333;
    display: grid;
    grid-template-columns: 2fr 1fr;
    position: relative;

    ${mq.medium} {
      display: table-row;
    }
  }

  td {
    padding: 2rem 0;

    &:nth-child(2) {
      grid-column: 1;
    }

    &:last-child {
      text-align: right;
      position: absolute;
      top: 0;
      right: 0;

      ${mq.medium} {
        position: unset;
      }
    }
  }
`;

export const ClearButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  color: ${theme.color.accent.primary};
  cursor: pointer;
`;

export const PerformerLink = styled.a`
  color: inherit;

  &:hover {
    color: ${theme.color.accent.primary};
  }
`;

export const PriceLabel = styled.div`
  font-weight: 700;
  color: ${theme.color.accent.primary};
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  svg {
    opacity: 0.6;
    transform: scale(0.7);
  }
`;
