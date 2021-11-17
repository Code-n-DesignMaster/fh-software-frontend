import { useState, useEffect, FC, Children, cloneElement, memo } from 'react';
import config from 'src/common/config';
import { WindowWithCollect } from 'src/common/types';

type Props = {
  onComplete: (token: string) => void;
};

const BuyButton: FC<Props> = memo(({ onComplete, children }) => {
  const [isLoaded, setLoaded] = useState(false);

  const initPayment = () => {
    (window as WindowWithCollect).CollectJS?.startPaymentRequest();
  };

  const configure = () =>
    (window as WindowWithCollect).CollectJS?.configure({
      variant: 'lightbox',
      callback: (token) => {
        onComplete(token.token);
      }
    });

  useEffect(() => {
    if (
      isLoaded &&
      document.querySelectorAll('[data-tokenization-key]').length > 0
    ) {
      setLoaded(true);
      configure();
    } else {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://secure.safewebservices.com/token/Collect.js';
      script.dataset.tokenizationKey = config.tokenizationKey;
      script.async = true;
      script.onload = () => {
        setLoaded(true);
        configure();
      };
      document.body.appendChild(script);
    }
  }, []);

  const child: any = Children.only(children);

  return cloneElement(child, {
    onClick: initPayment,
    disabled: !isLoaded
  });
});

export default BuyButton;
