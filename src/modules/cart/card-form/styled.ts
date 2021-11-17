import styled from 'styled-components';
import theme from 'style/theme';
import { heading, label } from 'style/typography';

export const Wrapper = styled.section`
  background: ${theme.color.background.white};
  border-radius: 1.5rem;
  padding: 4rem 3rem;
`;

export const Form = styled.form<{ isVisible: boolean }>`
  display: grid;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  grid-template-columns: 1fr 1fr;
  column-gap: 2rem;

  & > div {
    &:nth-child(1),
    &:nth-child(4) {
      grid-column: 1 / 3;
    }
  }

  button {
    grid-column: 1 / 3;
  }
`;

export const Title = styled.h3`
  ${heading.title};
  color: ${theme.color.text.dark};
  margin-bottom: 3rem;
`;

export const InputGroup = styled.div`
  margin-bottom: 2rem;
`;

export const Label = styled.label`
  ${label.regular};
  color: ${theme.color.text.dark};
  display: inline-block;
  margin-bottom: 1rem;
`;

export const Input = styled.div``;

export const Subtotal = styled.div`
  ${label.medium};
  color: ${theme.color.text.dark};
  border-top: 0.1rem solid #e1e8ee;
  margin: 4rem 0 2rem;
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
`;

export const Errors = styled.ul`
  ${label.small};
  background: #ff3b00;
  padding: 1rem 2rem;
  border-radius: 1rem;
  margin-bottom: 1rem;

  &:empty {
    display: none;
  }
`;
