import PlayIcon from '@components/icons/play';
import { Resource } from '@services/cart.service';
import {
  Wrapper,
  Preview,
  PreviewWrapper,
  IconWrapper,
  Category
} from './styled';

type Props = {
  item: Resource;
};

const Product = ({ item }: Props) => {
  return (
    <Wrapper>
      <PreviewWrapper>
        <Preview
          src={
            'title' in item ? item.thumbnail : item.coverPhoto.thumbnails?.[0]
          }
        />
        {'video' in item && (
          <IconWrapper>
            <PlayIcon />
          </IconWrapper>
        )}
      </PreviewWrapper>
      <div>
        {'title' in item ? item.title : item.name}
        <Category>{'title' in item ? 'Video' : 'Photo'}</Category>
      </div>
    </Wrapper>
  );
};

export default Product;
