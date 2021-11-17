import theme from 'style/theme';
import styled from 'styled-components';
import mq from 'style/mq';

export const Form = styled.form`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-column-gap: 1rem;
  position: relative;
 
  input {
    text-align: left !important;
    padding-right: 43px;
  }
  input::placeholder {
    text-align: left !important;
  }
  ${mq.medium} {
    grid-template-columns: 1fr 7.6% auto;
  }
`;

export const Button = styled.button`
  width: 4.3rem;
  height: 4.3rem;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  position: absolute;
  //display: none;
  right: 9px;
  padding-top: 6px;
  
  background: unset;
  svg {
    path {
      fill: #FAA61A;
    }
  }

  ${mq.medium} {
    display: flex;
    align-items: center;
    justify-content: center;
    position: unset;
    padding: unset;
    background: ${theme.color.orange.dark_tangerine};
    svg {
      path {
        fill: ${theme.color.text.dark};
      }
    }
  }
`;

