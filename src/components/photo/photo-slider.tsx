import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Modal, Button } from 'antd';
import { IPhotos, IGallery } from 'src/interfaces';
import { CloseSquareOutlined } from '@ant-design/icons';
import './photo.less';

interface PhotosSliderIProps {
  gallery: IGallery;
  photos: IPhotos[];
  visible: boolean;
  onClose(): Function;
  subscribed: boolean;
}
const PhotosSlider = ({
  onClose,
  visible,
  photos,
  gallery,
  subscribed
}: PhotosSliderIProps) => (
  <div>
    <Modal
      key="photo-slider"
      visible={visible}
      width="90%"
      footer={[
        <Button key="back-btn" onClick={onClose}>
          Close
        </Button>
      ]}
      closeIcon={<CloseSquareOutlined onClick={onClose} />}
      wrapClassName="photos-slider"
    >
      <h3 className="glr-name">{gallery.name}</h3>
      <p className="glr-decs">{gallery.description}</p>
      {subscribed ? (
        <Carousel>
          {photos
            && photos.length > 0
            && photos.map((photo) => (
              <img alt="img" src={photo.photo.url} key={photo._id} />
            ))}
        </Carousel>
      ) : (
        <h2>To view full content, subscribe me.</h2>
      )}
      {photos && !photos.length && <p>No photo found.</p>}
    </Modal>
  </div>
);
export default PhotosSlider;
