import { FC, SVGProps } from 'react';

const Login: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 18.24 13.99"
    width={18.24}
    height={13.99}
    {...props}
  >
    <g fill="#faa733">
      <path d="M13.47 14H7.38a1.71 1.71 0 01-1.48-.86L4.26 10.3l.88-.5 1.63 2.82a.7.7 0 00.61.36h6.09a.72.72 0 00.62-.36l3-5.27a.7.7 0 000-.71l-3-5.28a.71.71 0 00-.62-.36H7.38a.69.69 0 00-.61.35L5.33 3.86l-.87-.51L5.9.86A1.71 1.71 0 017.38 0h6.09A1.71 1.71 0 0115 .86l3 5.27a1.76 1.76 0 010 1.72l-3 5.28a1.71 1.71 0 01-1.53.87z" />
      <path d="M8.54 8.85l.79.8 2.66-2.66-2.66-2.65-.79.79 1.29 1.3H0v1.13h9.83L8.54 8.85z" />
    </g>
  </svg>
);

export default Login;
