import { css } from 'styled-components';
import theme from './theme';

const font = {
  base: '"Juana", serif',
  headings: '"HenriDidot", serif',
  label: '"GothamGreek", sans-serif'
};

const allHeadingsStyle = css`
  font-family: ${font.headings};
  color: ${theme.color.text.white};
`;

const heading = {
  h1: css`
    ${allHeadingsStyle};
    font-size: 6.4rem;
    line-height: 7.6rem;
  `,
  h2: css`
    ${allHeadingsStyle};
    font-size: 4rem;
    line-height: 4.8rem;
  `,
  h3: css`
    ${allHeadingsStyle};
    font-size: 2.8rem;
    line-height: 3rem;
  `,
  h5: css`
    ${allHeadingsStyle};
    font-size: 2rem;
    line-height: 2.4rem;
  `,
  title: css`
    font-family: ${font.label};
    color: ${theme.color.text.white};
    font-weight: 700;
    font-size: 2.4rem;
    line-height: 3.4rem;
  `
};

const paragraph = {
  regular: css`
    font-family: ${font.base};
    font-size: 1.4rem;
    line-height: 2rem;
    color: ${theme.color.text.white};
    font-weight: 100;
  `,
  medium: css`
    font-family: ${font.base};
    font-size: 1.6rem;
    line-height: 2rem;
    color: ${theme.color.text.white};
  `,
  large: css`
    font-family: ${font.base};
    font-size: 2rem;
    line-height: 2.4rem;
    color: ${theme.color.text.white};
    font-weight: 100;
  `
};

const label = {
  small: css`
    font-family: ${font.label};
    font-size: 1.2rem;
    line-height: 1.4rem;
    color: ${theme.color.text.white};
  `,
  regular: css`
    font-family: ${font.label};
    font-size: 1.4rem;
    line-height: 1.5rem;
    color: ${theme.color.text.white};
  `,
  medium: css`
    font-family: ${font.label};
    font-size: 1.5rem;
    line-height: 1.8rem;
    color: ${theme.color.text.white};
  `,
  large: css`
    font-family: ${font.label};
    font-size: 2rem;
    line-height: 2.5rem;
    color: ${theme.color.text.white};
  `
};

export { font, heading, paragraph, label };
