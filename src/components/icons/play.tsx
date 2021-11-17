import { FC, SVGProps } from 'react';

const Play: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 33.96 33.96"
    height={33.96}
    {...props}
  >
    <g fill="#fff">
      <path d="M17 34a17 17 0 1117-17 17 17 0 01-17 17zm0-31.67A14.65 14.65 0 1031.63 17 14.66 14.66 0 0017 2.33z" />
      <path d="M11.84 10v13.1a.71.71 0 001.08.61l11-6.55A.71.71 0 0024 16L13 9.46a.71.71 0 00-1.16.54z" />
    </g>
  </svg>
);

export default Play;
