import { FC, SVGProps } from 'react';

const Sort: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 31.17 23.68"
    height={23.68}
    {...props}
  >
    <g stroke="#fff" strokeLinejoin="round" strokeWidth={1.417}>
      <path fill="none" d="M0 4.03h31.17M0 11.98h31.15M0 19.76h31.15" />
      <path
        d="M3.73 19.71A3.27 3.27 0 117 23a3.27 3.27 0 01-3.27-3.29zM12.41 11.84a3.27 3.27 0 113.27 3.27 3.27 3.27 0 01-3.27-3.27zM21.08 4a3.27 3.27 0 113.27 3.27A3.26 3.26 0 0121.08 4z"
        fill="#231f20"
      />
    </g>
  </svg>
);

export default Sort;
