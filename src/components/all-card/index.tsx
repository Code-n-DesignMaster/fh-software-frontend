import React, { useMemo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { EyeOutlined } from '@ant-design/icons';
import Link from 'next/link';

import { formatDuration } from 'src/common/utils';
import { RootState } from '@redux/store';

import Blur from '../common/base/blur';
import Verified from "@components/icons/verified";
import PlayVideo from "@components/icons/play-video";
import PerformerCard from '@components/performer-card';
import GalleryCard from 'src/modules/profile/tabs/galleries/gallery-card';
import VideoCard from '@components/video/video-card';

type Props = {
    all: object;
};

const AllCard = ({ all }: Props) => {
    const currentUser = useSelector((state: RootState) => state.user.current);
    const includeAdmin = currentUser?.roles?.includes('admin');
    const [allArr, setAllArr] = useState([]);

    useEffect(() => {
        setAllArr(all.performers.concat(all.videos, all.galleries));
    }, []);

    const thumbUrl = useMemo(() => {
        if (all.thumbnail) {
            return all.thumbnail;
        }
        if (all.video?.thumbnails?.length && all.gallery) {
            all.video.thumbnails[0];
        }

        return '';
    }, []);

    console.log(allArr);

    const thumbImg =
        all && all.isSaleVideo && !all.isBought && !includeAdmin ? (
            <>
                <div className="price">
            <PlayVideo/>
            <p className="textBlur">Subscribe to see video</p>
{/*    <button className="subscribe" type="button">Subscribe {performer?.monthlyPrice ?? '0.00'}/month</button>*/}
    </div>
    <Blur className="blurImg" img={thumbUrl} blurRadius={20} />
    </>
) : (
        <img src={thumbUrl} alt={all.title} />
);

    return (
       <>
        {all.galleries.map((gallery) => <GalleryCard gallery={gallery} />)}
        {all.performers.map((performer) => <PerformerCard performer={performer} key={performer._id} />)}
        
        {all.videos.map((video) => <VideoCard video={video} performerState={all.performers} />)}
        
       </>
    );
};

export default AllCard;
