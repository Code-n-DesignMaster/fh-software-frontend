import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;

  .react-datepicker {
    font-size: 1.4rem;
  }

  .react-datepicker__day-name,
  .react-datepicker__day,
  .react-datepicker__time-name {
    width: 3rem;
    line-height: 3rem;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem;
`;
