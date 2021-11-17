import { FC } from 'react';
import Link from 'next/link';
import BuyButton from '@components/buy-button';
import CheckCircleIcon from '@components/icons/check-circle';
import { IGalleryResponse, IVideoResponse } from 'src/interfaces';
import { canView, canBuy, shouldSubscribe, getSource, getAlt } from './helpers';
import {
  PreviewWrapper,
  Preview,
  PreviewControls,
  CTA,
  ActionButton
} from './styled';

type Props = {
  user?: any;
  resource: IGalleryResponse | IVideoResponse;
  isInCart: boolean;
  onAddToCart: () => void;
  onBuy: (token: string) => void;
  onSubscribeFree: () => void;
  onSubscribe: (token: string) => void;
};

const Resource: FC<Props> = ({
  user,
  resource,
  children,
  isInCart,
  onAddToCart,
  onBuy,
  onSubscribe,
  onSubscribeFree
}) => {
  if (!user) {
    return (
      <PreviewWrapper>
        <Preview src={getSource(resource)} alt={getAlt(resource)} />
        <PreviewControls>
          <CTA>
            You&apos;re navigating as a guest user. Only members can subscribe,
            see photos, watch videos and interact with the models
          </CTA>
          <Link href="/">
            <ActionButton as="a">Sign in here</ActionButton>
          </Link>
        </PreviewControls>
      </PreviewWrapper>
    );
  }

  if (canView(user, resource)) {
    return <>{children}</>;
  }

  return (
    <PreviewWrapper>
      <Preview src={getSource(resource)} alt={getAlt(resource)} />
      <PreviewControls>
        {shouldSubscribe(user, resource) && (
          <>
            <CTA>To view full content, subscribe to me!</CTA>
            {resource.performer.monthlyPrice &&
              !!resource.performer.subsribeSwitch &&
              !resource.isSubscribed && (
                <BuyButton onComplete={onSubscribe}>
                  <ActionButton>
                    Subscribe Monthly $
                    {resource.performer.monthlyPrice.toFixed(2)}
                  </ActionButton>
                </BuyButton>
              )}
            {!resource.performer.subsribeSwitch &&
              !!resource.performer.freeSubsribeSwitch &&
              !resource.isFreeSubscribed &&
              !resource.isSubscribed && (
                <ActionButton onClick={onSubscribeFree}>
                  Subscribe For Free
                </ActionButton>
              )}
          </>
        )}
        {canBuy(user, resource) && (
          <>
            {isInCart ? (
              <>
                <CheckCircleIcon />
                <CTA>Added to the cart!</CTA>
              </>
            ) : (
              <>
                <BuyButton onComplete={onBuy}>
                  <ActionButton>
                    Purchase for ${resource.price.toFixed(2)}
                  </ActionButton>
                </BuyButton>
                <CTA>or</CTA>
                <ActionButton onClick={onAddToCart}>Add to cart</ActionButton>
              </>
            )}
          </>
        )}
      </PreviewControls>
    </PreviewWrapper>
  );
};

export default Resource;
