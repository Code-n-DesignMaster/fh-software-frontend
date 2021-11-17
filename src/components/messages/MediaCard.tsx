import React from 'react';
import { VideoCameraFilled, PictureFilled, FileImageFilled } from '@ant-design/icons'
import { PureComponent } from 'react';
import { Col, Row } from 'antd';

interface IProps {
    media: any;
    setActive: Function;
    selected: boolean;
}

export class MediaCard extends PureComponent<IProps> {

    getMediaInfo() {
        const { media } = this.props;
        const mediaType = media.isSaleGallery !== undefined ? 'gallery' : media.isSaleVideo !== undefined ? 'video' : 'photo';
        let mediaCoverPhoto = '', mediaTitle = '', mediePrice = '', mediaIcon = <VideoCameraFilled />,coverPhotoId = '', mediaId = '',isSale=false;
        switch (mediaType) {
            case "photo":
                mediaCoverPhoto = media.mediaUrl;
                coverPhotoId= media._id || '';
                isSale=false;
                mediaTitle = '';
                mediePrice = '';
                mediaIcon = <PictureFilled />;
                mediaId = media._id;
                break;
            case "video":
                mediaCoverPhoto = media.thumbnail || '';
                coverPhotoId=media.thumbnailId || '';
                isSale=media.isSaleVideo || false;
                mediaTitle = media.title;
                mediePrice = media.isSaleVideo ? `$${media.price}` : '';
                mediaIcon = <VideoCameraFilled />;
                mediaId = media._id;
                break;
            case "gallery":
                mediaCoverPhoto = media.coverPhoto?.url || '';
                coverPhotoId= media.coverPhoto?.coverPhotoId || '';
                isSale=media.isSaleGallery || false;
                mediaTitle = media.name;
                mediePrice = media.isSaleGallery ? `$${media.price}` : '';
                mediaIcon = <FileImageFilled />;
                mediaId = media._id;
                break;
            default:
                break;
        }
        return { mediaCoverPhoto, mediaTitle, mediePrice, mediaIcon, mediaId, mediaType, coverPhotoId, isSale }
    }
    render() {
        const { setActive, selected } = this.props;
        const className = selected
            ? 'media-card active'
            : 'media-card';
        const medieInfo = this.getMediaInfo();
        return (
            <div
                className={className}
                onClick={() => setActive(medieInfo)}>
                    <div className='image'>
                        <img src={medieInfo.mediaCoverPhoto} />
                    </div>
                    <div>
                    <Row>
                        <Col span={6}>
                            {medieInfo.mediaIcon}
                        </Col>
                        <Col span={12}>
                            <p style={{ margin: "0", textAlign: "center", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{medieInfo.mediaTitle}</p>
                        </Col>
                        <Col span={6} >
                            <p style={{ float: "right" }}>{medieInfo.mediePrice}</p>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}
