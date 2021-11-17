/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import Link from 'next/link';
import moment from 'moment';
import './Message.less';
import { IUser, IPerformer } from '@interface/index';
import {
  DollarCircleFilled,
  LockFilled,
  DollarOutlined
} from '@ant-design/icons';
import { Tag } from 'antd';
import Blur from 'src/components/common/base/blur';
import BuyButton from '@components/buy-button';
import {
  Wrapper,
  BubbleContainer,
  Bubble,
  TextMessage,
  Timestamp,
  TipMessage,
  GiveTipMessage
} from './styled';

interface IProps {
  data: any;
  isMine: boolean;
  startsSequence: boolean;
  endsSequence: boolean;
  showTimestamp: boolean;
  currentUser: IUser | IPerformer;
  recipient: IUser | IPerformer;
  openMVideo: Function;
  onSendTipClick: Function;
  buyGallery: (galleryId: string, token: string) => void;
  buyVideo: (videoId: string, token: string) => void;
}

export default function Message(props: IProps) {
  const {
    data,
    isMine,
    startsSequence,
    endsSequence,
    showTimestamp,
    currentUser,
    recipient,
    openMVideo: handleClickMVideo,
    onSendTipClick: handleClick,
    buyGallery,
    buyVideo
  } = props;

  const friendlyTimestamp = moment(data.createdAt).format('MMM. D, h:mm a');

  const onBuyVideo = (token: string) => {
    buyVideo(data.mediaId, token);
  };

  const onBuyGallery = (token: string) => {
    buyGallery(data.mediaId, token);
  };

  return (
    <Wrapper
      className={[
        'message',
        `${isMine ? 'mine' : ''}`,
        `${startsSequence ? 'start' : ''}`,
        `${endsSequence ? 'end' : ''}`
      ].join(' ')}
    >
      {(data.text ||
        ((data.type === 'tipauto' || data.type === 'subauto') &&
          data.text === '') ||
        data.type === 'photo') && (
        <BubbleContainer isMine={isMine} className="bubble-container">
          <Bubble isMine={isMine} className="bubble" title={friendlyTimestamp}>
            {data.type === 'text' && (
              <TextMessage dangerouslySetInnerHTML={{ __html: data.text }} />
            )}{' '}
            {data.type === 'photo' &&
              (data.mimeType === 'image' ? (
                <div>
                  {data.isTipOption !== undefined &&
                  data.fileId === data.mediaId ? (
                    <div className="media-image">
                      <div>
                        <a
                          title="Click to view full content"
                          href={data.imageUrl}
                          target="_blank"
                        >
                          <img alt="" src={data.imageUrl} />
                        </a>
                      </div>
                    </div>
                  ) : data.isBought || isMine || !data.isSale ? (
                    <div className="media-image">
                      <div>
                        <Link
                          href={{
                            pathname: '/gallery',
                            query: {
                              id: data.mediaId,
                              performerId: data.senderId
                            }
                          }}
                          as={`/gallery?id=${data.mediaId}&performerId=${data.senderId}`}
                        >
                          <a>
                            <img src={data.imageUrl || '/banner-image.jpg'} />
                          </a>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="media-image">
                      <div>
                        <div>
                          <Blur
                            className={'blurImg'}
                            img={data.imageUrl || '/banner-image.jpg'}
                            blurRadius={20}
                          ></Blur>
                        </div>
                      </div>
                      <div className="media-lock">
                        <div className="icon-bg">
                          <LockFilled />
                        </div>
                        <BuyButton onComplete={onBuyGallery}>
                          <Tag> Unlock for $ {data.price} </Tag>
                        </BuyButton>
                      </div>
                    </div>
                  )}
                  {data.text && (
                    <TextMessage
                      dangerouslySetInnerHTML={{ __html: data.text }}
                    />
                  )}
                  {!isMine &&
                    data.isTipOption !== undefined &&
                    data.isTipOption === true && (
                      <GiveTipMessage>
                        <DollarOutlined
                          style={{ fontSize: '20px', color: '#10b216' }}
                        />{' '}
                        <Tag
                          style={{
                            borderRadius: '10px',
                            marginLeft: '5px',
                            cursor: 'pointer'
                          }}
                          color="green"
                          onClick={() => handleClick()}
                        >
                          Enjoying the images? Click here to send a tip!
                        </Tag>
                      </GiveTipMessage>
                    )}
                </div>
              ) : data.mimeType === 'video' ? (
                <div>
                  {data.isBought || isMine || !data.isSale ? (
                    <div className="media-image">
                      <div>
                        <Link
                          href={{
                            pathname: '/video',
                            query: { id: data.mediaId }
                          }}
                          as={`/video?id=${data.mediaId}`}
                        >
                          <a>
                            <img src={data.imageUrl || '/banner-image.jpg'} />
                          </a>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="media-image">
                      <div>
                        <div>
                          <Blur
                            className={'blurImg'}
                            img={data.imageUrl || '/banner-image.jpg'}
                            blurRadius={20}
                          ></Blur>
                        </div>
                      </div>
                      <div className="media-lock">
                        <div className="icon-bg">
                          <LockFilled />
                        </div>
                        <BuyButton onComplete={onBuyVideo}>
                          <Tag> Unlock for $ {data.price} </Tag>
                        </BuyButton>
                      </div>
                    </div>
                  )}
                  {data.text && (
                    <div className="image-note">
                      <pre
                        className="pre-wrap font-family-p"
                        style={{
                          width: '270px',
                          wordBreak: 'break-word',
                          padding: '0 10px',
                          marginTop: '10px'
                        }}
                        dangerouslySetInnerHTML={{ __html: data.text }}
                      />
                    </div>
                  )}
                  {!isMine &&
                    data.isTipOption !== undefined &&
                    data.isTipOption === true && (
                      <TipMessage>
                        <DollarOutlined
                          style={{ fontSize: '20px', color: '#10b216' }}
                        />{' '}
                        <Tag
                          style={{
                            borderRadius: '10px',
                            marginLeft: '5px',
                            cursor: 'pointer'
                          }}
                          color="green"
                          onClick={() => handleClick()}
                        >
                          Enjoying the video? Click here to send a tip!
                        </Tag>
                      </TipMessage>
                    )}
                </div>
              ) : (
                <a
                  title="Click to view full content"
                  href={data.imageUrl}
                  target="_blank"
                >
                  <img alt="" src={data.imageUrl} width="180px" />
                </a>
              ))}
            {data.type === 'tipauto' && data.tipAmount !== undefined && (
              <div>
                <TipMessage>
                  <DollarCircleFilled
                    style={{ fontSize: '20px', color: '#10b216' }}
                  />{' '}
                  <Tag
                    style={{ borderRadius: '10px', marginLeft: '5px' }}
                    color="green"
                  >
                    I sent you a ${data.tipAmount} tip.
                  </Tag>
                </TipMessage>
                {data.text && (
                  <TextMessage
                    dangerouslySetInnerHTML={{ __html: data.text }}
                  />
                )}
              </div>
            )}
            {data.type === 'subauto' &&
              data.tipAmount === undefined &&
              data.mimeType !== undefined && (
                <div>
                  {data.mimeType.includes('image') ? (
                    <a
                      title="Click to view full content"
                      href={data.imageUrl}
                      target="_blank"
                    >
                      <img alt="" src={data.imageUrl} width="180px" />
                    </a>
                  ) : (
                    <a title="Click to play video" target="_blank">
                      {data.videoUrl && (
                        <img
                          src={'/videothumbnail.png'}
                          width="180px"
                          onClick={() => handleClickMVideo(data.videoUrl)}
                        />
                      )}
                    </a>
                  )}
                  <TextMessage
                    className="pre-wrap font-family-p"
                    dangerouslySetInnerHTML={{ __html: data.text }}
                  />
                </div>
              )}
          </Bubble>
        </BubbleContainer>
      )}
      <Timestamp isMine={isMine}>{friendlyTimestamp}</Timestamp>
    </Wrapper>
  );
}
