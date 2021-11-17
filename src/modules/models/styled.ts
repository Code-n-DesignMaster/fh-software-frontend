import styled from 'styled-components';
import theme from 'style/theme';
import mq from 'style/mq';

export const Wrapper = styled.div`
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

export const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 1rem;
  &.filter {
    flex-direction: column;
    padding-bottom: 4rem;
    ${mq.medium} {
      flex-direction: row;
    }
  }
  ${mq.medium} {
    padding-bottom: 2rem;
  }
`;

export const PerformerList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  ${mq.medium} {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 4rem;
  }
`;

export const PaginationControls = styled.div`
  display: flex;
  margin-top: 5rem;
  justify-content: space-between;
  
  @media (max-width: 768px) {
    flex-flow: column;
    align-items: center;
    .total {
      margin-bottom: 30px;
    }
  }
  
  .total {
    font-size: 14px;
    font-family: "GothamGreek",sans-serif;
    text-transform: capitalize;
    color: ${theme.color.text.white};
  }
  .ant-pagination {
    
    .ant-pagination-item-link:disabled {
       background-color: unset;
       border: 1px solid #B0B7C3;
       svg {
          color: #B0B7C3;
       }
    }
    .ant-pagination-item-link {
      box-sizing: border-box;
      border-radius: 10px;
      background-color: #FAA61A;
      border: unset;
      svg {
        color: ${theme.color.text.white};
      }
    }
    
    .ant-pagination-item:hover {
       color: #FAA61A;
    }
    .ant-pagination-item {
      font-family: "GothamGreek",sans-serif;
      background-color: unset;
      font-weight: bold;
      border: unset;
      font-size: 16px;
      line-height: 29px;
      a:hover {
        color: #FAA61A;
      }
    }
    .ant-pagination-item-active a {
      color: #FAA61A;
    }
    .ant-pagination-item-ellipsis {
      color: #B0B7C3;
    }
   
  }
`;

export const ControlWrapper = styled.div`
  margin-bottom: 4rem;
  border-bottom: 0.1rem solid ${theme.color.text.gray};
`;

export const FilterButton = styled.button`
  color: white;
  font-size: 12px;
  background: transparent;
  border: 0;
  padding: 0 29px;
  font-family: "GothamGreek",sans-serif;
  letter-spacing: 0.8px;
  height: 35px;
  border-radius: 8px;
  cursor: pointer;
  &.active {
    background: #1f1f1f;
    color: #faa61a;
  }
  :first-child {
    padding: 0 40px;
    letter-spacing: 0;
   }
`;

export const Title = styled.h1`
  font-size: 37px;
  margin-bottom: 2rem;
  color: white;
  line-height: 40px;
  ${mq.medium} {
    font-size: 42px;
    line-height: 42px;
    margin: 56px 0 26px;
    font-family: Henri Didot;
    font-style: normal;
    font-weight: normal;
    letter-spacing: -1.4px;
  }
`;

export const Filter = styled.button`
  //width: 4.3rem;
  height: 4.3rem;
  border-radius: 50%;
  border: 1px solid #FAA61A;
  cursor: pointer;
  font-size: 16px;
  padding: 10px 12px;

  svg {
    margin-right: unset;
  }
  span {
    display: none;
  }
  color: ${theme.color.orange.dark_tangerine};
  background: ${theme.color.text.dark};
   

  ${mq.medium} {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 30px;
    padding: 10px 32px 10px 27px;
    svg {
      margin-right: 16px;
      path {
        fill: ${theme.color.orange.dark_tangerine};
      }
    }
    span {
      display: inline;
    }
  }
`;
