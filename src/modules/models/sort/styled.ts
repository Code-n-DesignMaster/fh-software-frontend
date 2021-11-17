import theme from 'style/theme';
import styled from 'styled-components';
import mq from 'style/mq';

export const Wrapper = styled.div`
  position: relative;
  // width: 4.3rem;
  // height: 4.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  svg {
    position: absolute;
    pointer-events: none;
    right: 15px;
  }
  margin-top: 2rem;
  position: relative;
  ${mq.medium} {
    margin-top: 0;
  }
`;

export const Select = styled.select`
  appearance: none;
  width: 100%;
  background: transparent;
  cursor: pointer;
  border: 1px solid #788292;
  box-sizing: border-box;
  border-radius: 30px;
  padding: 2px 20px 5px;
  padding-right: 3rem;
  font-size: 14px;
  font-weight: 300;
  height: 34px;
  option {
    color: ${theme.color.text.dark};
  }
  padding-top: 4px;
  padding-left: 73px;
  ${mq.medium} {
    //padding-left: 20px;
    margin-left: 2rem;
    padding-right: 101px;
    padding-left: 12px;
    padding-top: unset;
  }
`;

export const Label = styled.span`
  white-space: nowrap;
  color: #788292;
  font-size: 14px;
  font-weight: 300;
  position: absolute;
  left: 18px;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  ${mq.medium} {
    position: unset;
  }
`;
