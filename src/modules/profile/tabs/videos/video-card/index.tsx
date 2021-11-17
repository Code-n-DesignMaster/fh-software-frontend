import Link from 'next/link';
import { IVideo } from 'src/interfaces';
import Blur from 'src/components/common/base/blur';
import HourglassIcon from '@components/icons/hourglass';
import CheckmarkIcon from '@components/icons/checkmark';
import PlayIcon from '@components/icons/play';
import StarIcon from '@components/icons/star';
import { formatDuration } from 'src/common/utils';
import {
  Wrapper,
  StyledLink,
  Preview,
  PreviewInner,
  Title,
  Duration,
  Price
} from './styled';

type Props = {
  video: IVideo;
};

const VideoCard = ({ video }: Props) => {
  const thumbUrl = video.thumbnail
    ? video.thumbnail
    : video.video.thumbnails && video.video.thumbnails.length > 0
    ? video.video.thumbnails[0]
    : '';

  const shouldBlur = video.isSaleVideo && !video.isBought;
  const isPaid = video.isSaleVideo && video.price > 0;

  return (
    <Link
      href={{ pathname: '/video', query: { id: video._id } }}
      as={`/video?id=${video._id}`}
    >
      <StyledLink>
        <Wrapper>
          <Preview>
            {shouldBlur ? (
              <Blur img={thumbUrl} blurRadius={20} />
            ) : (
              <img src={thumbUrl} alt={video.title} />
            )}
            <PreviewInner>
              <PlayIcon />
            </PreviewInner>
          </Preview>
          <Title>{video.title}</Title>
          <Duration>
            <HourglassIcon />{' '}
            {formatDuration(video.video?.duration?.toString())}
          </Duration>
          <Price>
            {isPaid ? <StarIcon /> : <CheckmarkIcon />}
            {isPaid ? `$${video.price.toFixed(2)}` : 'Free'}
          </Price>
        </Wrapper>
      </StyledLink>
    </Link>
  );
};

export default VideoCard;
