import { useState, useEffect, FC } from 'react';
import { useRouter } from 'next/router';
import Loader from '@components/loader';
import Header from '@components/header';
import CartContextProvider from 'src/context/cart';
import GlobalStyle from 'style/global';

type Props = {
  transparent?: boolean;
};

const NewLayout: FC<Props> = ({ children, transparent }) => {
  const { events } = useRouter();
  const [routeChange, setRouteChange] = useState(false);

  useEffect(() => {
    events.on('routeChangeStart', () => setRouteChange(true));
    events.on('routeChangeComplete', () => setRouteChange(false));
  }, [events]);

  return (
    <>
      <GlobalStyle />
      {routeChange && <Loader />}
      <CartContextProvider>
        <Header transparent={transparent} />
        {children}
      </CartContextProvider>
    </>
  );
};

export default NewLayout;
