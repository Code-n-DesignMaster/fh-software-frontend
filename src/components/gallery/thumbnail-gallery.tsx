import { PureComponent, Fragment } from 'react';
import { IGalleryResponse } from 'src/interfaces';
import { Row, Col } from 'antd';
import Blur from '../common/base/blur'
interface IProps {
  gallery?: IGalleryResponse;
  style?: Record<string, string>;
}

export class ThumbnailGallery extends PureComponent<IProps> {
  render() {
    const { gallery } = this.props;
    const url = gallery.coverPhoto && gallery.coverPhoto.thumbnails && gallery.coverPhoto.thumbnails.length > 0 ? gallery.coverPhoto.thumbnails[0] : '/gallery.png';
    return <Row>
      {gallery.coverPhoto && gallery.coverPhoto.thumbnails.length > 0 ? gallery.coverPhoto.thumbnails.map((thumb, index) => {
        return <Col span={8} key={index}><Blur className={"blurImg"} img = {thumb} blurRadius={20}></Blur></Col>
      }) : <Col><Blur className={"blurImg"} img = {url} blurRadius={20}></Blur></Col>}
    </Row>
  }
}
