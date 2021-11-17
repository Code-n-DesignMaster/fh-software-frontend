import { PureComponent } from 'react';
import { Carousel } from 'antd';

interface IProps {
  banners?: any;
}

export class Banner extends PureComponent<IProps> {
  render() {
    const { banners } = this.props;
    return (
      <div>
        {banners && banners.length > 0
        && (
        <Carousel autoplay swipeToSlide arrows dots={false}>
          {banners.map((item) => (
            <img src={item.photo && item.photo.url} alt="" key={item._id} />
          ))}
        </Carousel>
        )}
      </div>

    );
  }
}
