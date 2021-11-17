import { useState, useEffect } from 'react';
import { PrimaryButton } from '@components/buttons';
import config from 'src/common/config';
import { WindowWithCollect } from 'src/common/types';
import {
  Wrapper,
  Title,
  Form,
  InputGroup,
  Label,
  Input,
  Subtotal,
  Errors
} from './styled';

type ErrorMap = {
  [field: string]: string;
};

type Props = {
  total: number;
  onComplete: (token: string) => void;
};

const CardForm = ({ onComplete, total }: Props) => {
  const [isLoaded, setLoaded] = useState(false);
  const [isReady, setReady] = useState(false);
  const [errors, setErrors] = useState<ErrorMap>({});
  const [isProcessing, setProcessing] = useState(false);

  const configure = () =>
    (window as WindowWithCollect).CollectJS?.configure({
      variant: 'inline',
      paymentSelector: '#checkout',
      fields: {
        ccnumber: {
          selector: '#ccnumber',
          placeholder: 'XXXX XXXX XXXX XXXX'
        },
        ccexp: {
          selector: '#ccexp',
          placeholder: 'XX/XX'
        },
        cvv: {
          selector: '#cvv',
          placeholder: 'XXX'
        }
      },
      callback: (token) => {
        setProcessing(false);
        onComplete(token.token);
      },
      validationCallback: (field, status, message) => {
        setProcessing(false);
        if (status) {
          setErrors((prev) => {
            const { [field]: _, ...rest } = prev;
            return rest;
          });
        } else {
          setErrors((prev) => ({
            ...prev,
            [field]: message
          }));
        }
      },
      fieldsAvailableCallback: () => {
        setReady(true);
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
      script.dataset.customCss = `{
        "border-radius": "30px",
        "border": "1px solid #E1E8EE",
        "padding": "14px 20px",
        "height": "42px"
        }`;
      script.dataset.focusCss = `{
        "border": "1px solid #FAA61A"
      }`;
      script.async = true;
      script.onload = () => {
        setLoaded(true);
        configure();
      };
      document.body.appendChild(script);
    }
  }, []);

  return (
    <Wrapper>
      <Title>Card details</Title>
      <Errors>
        {Object.keys(errors).map((key) => (
          <li key={key}>
            {key}: {errors[key].toLowerCase()}
          </li>
        ))}
      </Errors>
      <Form isVisible={isReady}>
        <InputGroup>
          <Label>Credit card number</Label>
          <Input id="ccnumber" />
        </InputGroup>
        <InputGroup>
          <Label>Expiry date</Label>
          <Input id="ccexp" />
        </InputGroup>
        <InputGroup>
          <Label>CVV code</Label>
          <Input id="cvv" />
        </InputGroup>
        <Subtotal>
          <div>Subtotal</div>
          <strong>${total.toFixed(2)}</strong>
        </Subtotal>
        <PrimaryButton
          onClick={() => setProcessing(true)}
          id="checkout"
          disabled={isProcessing}
        >
          Checkout
        </PrimaryButton>
      </Form>
    </Wrapper>
  );
};

export default CardForm;
