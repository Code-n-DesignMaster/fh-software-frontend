import { FC, SVGProps } from 'react';

const Chevron: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 8.01 15.15"
    height={15.15}
    {...props}
  >
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.878}
      d="M.44.44l7.13 7.13-7.13 7.14"
    />
  </svg>
);

export default Chevron;
