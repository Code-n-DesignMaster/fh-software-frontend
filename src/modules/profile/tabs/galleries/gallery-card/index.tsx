import Link from 'next/link';
import { IGallery } from 'src/interfaces';
import Blur from 'src/components/common/base/blur';
import CheckmarkIcon from '@components/icons/checkmark';
import EyeIcon from '@components/icons/eye';
import StarIcon from '@components/icons/star';
import {
  Wrapper,
  Preview,
  StyledLink,
  PreviewInner,
  Title,
  Price,
  NumText
} from './styled';

type Props = {
  gallery: IGallery;
};

const GalleryCard = ({ gallery }: Props) => {
  const {
    numOfItems = 1,
    performerId,
    _id,
    name,
    price,
    coverPhoto,
    isSaleGallery,
    isBought
  } = gallery || {};

  const thumbUrl =
    coverPhoto && coverPhoto.thumbnails.length
      ? coverPhoto.thumbnails[0]
      : '/gallery.png';

  const shouldBlur = isSaleGallery && !isBought;
  const isPaid = isSaleGallery && price > 0;
  return (
    <Link
      href={{
        pathname: '/gallery',
        query: { id: _id, performerId }
      }}
      as={`/gallery?id=${_id}&performerId=${performerId}`}
    >
      <StyledLink>
        <Wrapper>
          <Preview>
            {shouldBlur ? (
              <Blur img={thumbUrl} blurRadius={20} />
            ) : (
              <img src={thumbUrl} alt={name} />
            )}
            <PreviewInner>
              <EyeIcon />
            </PreviewInner>
          </Preview>
          <Title>{name}</Title>
          <Price>
            {isPaid ? <StarIcon /> : <CheckmarkIcon />}
            {isPaid ? `$${price.toFixed(2)}` : 'Free'}
            &nbsp;
            <NumText>
              {numOfItems > 1
                ? `(${numOfItems} Photos)`
                : `(${numOfItems} Photo)`}
            </NumText>
          </Price>
        </Wrapper>
      </StyledLink>
    </Link>
  );
};

export default GalleryCard;
