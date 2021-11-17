/* eslint-disable react/no-array-index-key */
import { PureComponent } from 'react';
import { IVideoResponse } from 'src/interfaces';
import { Row, Col } from 'antd';

interface IProps {
  video?: IVideoResponse;
  style?: Record<string, string>;
}

export class ThumbnailVideo extends PureComponent<IProps> {
  render() {
    const { video: videoProp, style } = this.props;
    const { thumbnail, video } = videoProp;
    const url = thumbnail
      || (video && video.thumbnails && video.thumbnails.length > 0
        ? video.thumbnails[0]
        : '/video.png');
    return (
      <Row>
        {video.thumbnails && video.thumbnails.length > 0 ? (
          video.thumbnails.map((thumb, index) => (
            <Col span={8} key={index}>
              <img alt="" src={thumb} style={style || { width: 130 }} />
            </Col>
          ))
        ) : (
          <Col>
            <img alt="" src={url} style={style || { width: 130 }} />
          </Col>
        )}
      </Row>
    );
  }
}
