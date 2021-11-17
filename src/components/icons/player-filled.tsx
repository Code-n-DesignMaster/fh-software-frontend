import { FC, SVGProps } from 'react';

const PlayerFilled: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 23.83 20.49"
    height={20.49}
    {...props}
  >
    <path
      fill="currentColor"
      d="M22.43 0h-21A1.4 1.4 0 000 1.4v12.1a1.4 1.4 0 001.39 1.4h21a1.4 1.4 0 001.4-1.4V1.4A1.4 1.4 0 0022.43 0zM14 7.85l-3.7 2.32a.44.44 0 01-.47 0 .47.47 0 01-.24-.41V5.12a.46.46 0 01.24-.4.47.47 0 01.47 0L14 7.06a.44.44 0 01.22.39.47.47 0 01-.22.4zM23.37 18.16H6.74a1.86 1.86 0 00-3.61 0H.47a.47.47 0 100 .93h2.66a1.86 1.86 0 003.61 0h16.63a.47.47 0 000-.93m-18.44 1.4a.94.94 0 11.93-.94.94.94 0 01-.93.94"
    />
  </svg>
);

export default PlayerFilled;
