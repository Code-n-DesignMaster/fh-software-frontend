import { FC, SVGProps } from 'react';

const Hamburger: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 23.69 13.38"
    height={13.38}
    {...props}
  >
    <g fill="none" stroke="#f7a822" strokeLinejoin="round" strokeWidth={1.417}>
      <path d="M0 .71h19.89M0 6.75h23.69M0 12.67h16.6" />
    </g>
  </svg>
);

export default Hamburger;
