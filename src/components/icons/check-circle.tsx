import { FC, SVGProps } from 'react';

const CheckCircle: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width={61}
    height={61}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={30.5} cy={30.5} r={30.5} fill="#FAA61A" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M26.5 37.3l-5.25-5.25a1.476 1.476 0 00-2.1 0 1.476 1.476 0 000 2.1l6.285 6.285c.585.584 1.53.584 2.115 0l15.9-15.886a1.476 1.476 0 000-2.1 1.476 1.476 0 00-2.1 0L26.5 37.3z"
      fill="#fff"
    />
  </svg>
);

export default CheckCircle;
