import styled from 'styled-components';
import theme from 'style/theme';
import mq from 'style/mq';
import { heading } from 'style/typography';

export const Wrapper = styled.section`
  min-height: 100vh;
  background: ${theme.color.background.dark};
`;

export const Inner = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  padding: 0 2rem;

  ${mq.medium} {
    padding: 0;
  }
`;

export const Title = styled.h1`
  ${heading.h2};
  margin: 4rem 0 3rem;
`;

export const TableWrapper = styled.div`
  overflow-x: auto;

  table {
    border: 0.1rem solid ${theme.color.border};
    background: ${theme.color.background.dark};
  }

  thead {
    .ant-table-cell {
      background: ${theme.color.background.dark};
      color: ${theme.color.text.white};
    }
  }

  tbody {
    .ant-table-cell {
      background: #f8f9fa;
    }
  }
`;
