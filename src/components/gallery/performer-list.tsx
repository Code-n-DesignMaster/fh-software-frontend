import { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { IGallery } from '../../interfaces/gallery';
import GalleryCard from '../gallery/gallery-card';

interface IProps {
    galleries: any,
}

export class PerformerListGallery extends PureComponent<IProps> {
  render() {
    const galleries = this.props.galleries;
    return (
        <Row>
        {galleries && galleries.length > 0 && galleries.map((gallery: IGallery) => (
          <Col xs={12} sm={12} md={8} lg={6} xl={6} key={gallery._id}>
            <GalleryCard gallery={gallery} fromModelPage={true} />
          </Col>
        ))}
        </Row>
    )
  }
}