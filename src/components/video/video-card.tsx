import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { EyeOutlined } from '@ant-design/icons';
import Link from 'next/link';

import { formatDuration } from 'src/common/utils';
import { RootState } from '@redux/store';

import { IVideo } from '../../interfaces';
import './video.less';
import Blur from '../common/base/blur';
import Verified from "@components/icons/verified";
import PlayVideo from "@components/icons/play-video";

type Props = {
  video: IVideo;
  performerState: any;
};

const VideoCard = ({ video, performerState }: Props) => {
  const currentUser = useSelector((state: RootState) => state.user.current);
  const includeAdmin = currentUser?.roles?.includes('admin');

  const thumbUrl = useMemo(() => {
    if (video.thumbnail) {
      return video.thumbnail;
    }
    if (video.video?.thumbnails?.length) {
      video.video.thumbnails[0];
    }
    return '';
  }, []);

  const performer = performerState.find((p) => video.performerId === p._id);

  const thumbImg =
    video && video.isSaleVideo && !video.isBought && !includeAdmin ? (
      <>
        <div className="price">
            <PlayVideo/>
          <p className="textBlur">Subscribe to see video</p>
          <button className="subscribe" type="button">Subscribe {performer?.monthlyPrice ?? '0.00'}/month</button>
        </div>
        <Blur className="blurImg" img={thumbUrl} blurRadius={20} />
      </>
    ) : (
      <img src={thumbUrl} alt={video.title} />
    );

  return (
    <div className="vid-card">
      <div className="vid-thumb">
        <Link
          href={{ pathname: '/video', query: { id: video._id } }}
          as={`/video?id=${video._id}`}
        >
          <a>{thumbImg}</a>
        </Link>
        <Link
          href={{ pathname: '/video', query: { id: video._id } }}
          as={`/video?id=${video._id}`}
        >
          <div className="vid-stats">
            {includeAdmin && (
              <span>
                <EyeOutlined />{' '}
                {video.stats && video.stats.views ? video.stats.views : 0}
              </span>
            )}

          </div>
        </Link>
      </div>
      <div className="vid-footer">
        <div className="vid-subfooter">
            <Link
                  href={{ pathname: '/video', query: { id: video._id } }}
                  as={`/video?id=${video._id}`}
            >
              <div className="vid-name">{video.title}</div>
            </Link>
            <span>
                {formatDuration(video.video?.duration.toString())}
            </span>
        </div>
        <Link
            href={{pathname: `/model/${video.performer?.username}`}}
            as={`/model/${video.performer?.username}`}
        >
          <div className="performer-name">
            <Verified className="verified" />
            <span className="text-name">@{video.performer?.username}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default VideoCard;
