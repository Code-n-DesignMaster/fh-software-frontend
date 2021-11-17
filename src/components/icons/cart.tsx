import { FC, SVGProps } from 'react';

const Cart: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width={16}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M14.89 4.219h-2.142A4.788 4.788 0 008 0a4.788 4.788 0 00-4.748 4.219H1.109a.703.703 0 00-.703.703v12.375c0 .388.315.703.703.703h13.782a.703.703 0 00.703-.703V4.922a.703.703 0 00-.703-.703zM8 1.406a3.38 3.38 0 013.328 2.813H4.672A3.38 3.38 0 018 1.406zm6.188 15.188H1.812V5.625H3.22v2.11a.703.703 0 101.406 0v-2.11h6.75v2.11a.703.703 0 101.406 0v-2.11h1.406v10.969z"
      fill="#FAA61A"
    />
  </svg>
);

export default Cart;
