import { FC, SVGProps } from 'react';

const Albums: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 21.64 21.64"
    height={21.64}
    {...props}
  >
    <path
      d="M21.64 7.14V19.9a.56.56 0 000 .12 2 2 0 01-2 1.61H7.45a2 2 0 01-.85-.2 2 2 0 01-1.17-1.89v-.61h-.75a2 2 0 01-1.92-1.7c-.05-.32 0-.66-.05-1a4.68 4.68 0 01-.65 0 3.22 3.22 0 01-.88-.2A2 2 0 010 14.12V2A2 2 0 01.74.47a2.66 2.66 0 011-.47h12.85a2 2 0 011.61 1.76 7.49 7.49 0 010 1 2.55 2.55 0 012.13.59 2.51 2.51 0 01.59 2.11h.71a2 2 0 011.52.72 2.55 2.55 0 01.49.96zM8.11 1.35H2.2c-.6 0-.85.25-.85.85V14c0 .6.25.85.85.85H14c.6 0 .85-.25.85-.85V2.2c0-.6-.25-.85-.85-.85zm-4 14.88v.5c0 .61.24.85.86.85h11.74c.63 0 .87-.24.87-.86v-12a.65.65 0 00-.58-.64 7.12 7.12 0 00-.8 0V14.1a2.27 2.27 0 01-.2 1 1.93 1.93 0 01-1.89 1.17H4.06zm2.7 2.7v.48c0 .63.24.87.87.87h11.74c.62 0 .87-.24.87-.86V7.63a1.69 1.69 0 000-.23.62.62 0 00-.47-.59 6.29 6.29 0 00-.88-.06v10.06a2.34 2.34 0 01-.19 1 2 2 0 01-1.9 1.17H6.76z"
      fill="#fff"
    />
  </svg>
);

export default Albums;
