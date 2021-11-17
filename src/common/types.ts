export type TokenResponse = {
  token: string;
};

export type WindowWithCollect = Window &
  // eslint-disable-next-line no-undef
  typeof globalThis & {
    CollectJS: {
      startPaymentRequest?: () => void;
      configure: (options: {
        variant?: 'lightbox' | 'inline';
        paymentSelector?: string;
        fields?: {
          [field: string]: {
            selector?: string;
            placeholder?: string;
          };
        };
        callback?: (token: TokenResponse) => void;
        validationCallback?: (
          field: string,
          status: boolean,
          message: string
        ) => void;
        fieldsAvailableCallback?: () => void;
      }) => void;
    };
  };
