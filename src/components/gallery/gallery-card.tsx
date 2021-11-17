import React from 'react';
import { connect } from 'react-redux';
import { IGallery } from 'src/interfaces';
import './gallery.less';
import Link from 'next/link';
import { PureComponent } from 'react';
import Blur from '../common/base/blur';
import Explore from "@components/icons/eye";
import Verified from "@components/icons/verified";

interface IProps {
  gallery: IGallery;
  performerState: object;
  currentUser: any;
  fromModelPage?: boolean;
}

class GalleryCard extends PureComponent<IProps> {
  render() {
    const { gallery, fromModelPage, currentUser, performerState } = this.props;
    const performer = performerState?.data?.data?.find((p) => gallery.performerId === p._id);
    const includeAdmin =
      (currentUser &&
        currentUser.roles &&
        currentUser.roles.includes('admin')) ||
      false;
    const thumbUrl =
      gallery.coverPhoto && gallery.coverPhoto.thumbnails.length
        ? gallery.coverPhoto.thumbnails[0]
        : '/gallery.png';
    const thumbImg =
      gallery && gallery.isSaleGallery && !gallery.isBought && !includeAdmin ? (
        <>
          <div className="price">
              <Explore />
              <p className="textBlur">Subscribe to see photo</p>
              <button className="subscribe" type="button">Subscribe {performer?.monthlyPrice ?? '0.00'}/month</button>
          </div>

          <Blur className="blurImg" img={thumbUrl} blurRadius={20} />
      </>
      ) : (
        <img src={thumbUrl} alt={gallery.name} />
      );

    return (
      <div className="gallery-card">
        <div className="gallery-cover">
          {fromModelPage && (
            <Link
              href={{
                pathname: '/gallery',
                query: { id: gallery._id, performerId: gallery.performerId }
              }}
              as={`/gallery?id=${gallery._id}&performerId=${gallery.performerId}`}
            >
              {thumbImg}
            </Link>
          )}
          {!fromModelPage && (
            <Link
              href={{
                pathname: '/gallery',
                query: { id: gallery._id, performerId: gallery.performerId }
              }}
              as={`/gallery?id=${gallery._id}&performerId=${gallery.performerId}`}
            >
              {thumbImg}
            </Link>
          )}
        </div>
        {fromModelPage && (
          <Link
            href={{
              pathname: '/gallery',
              query: { id: gallery._id, performerId: gallery.performerId }
            }}
            as={`/gallery?id=${gallery._id}&performerId=${gallery.performerId}`}
          >
            <div className="gallery-name">{gallery.name}</div>
          </Link>
        )}
        {!fromModelPage && (
         <div className="gallery-footer">
          <Link
            href={{
              pathname: '/gallery',
              query: { id: gallery._id, performerId: gallery.performerId }
            }}
            as={`/gallery?id=${gallery._id}&performerId=${gallery.performerId}`}
          >
            <div className="gallery-name">{gallery.name}</div>
          </Link>
          <Link
            href={{pathname: `/model/${gallery.performer?.username}`}}
            as={`/model/${gallery.performer?.username}`}
          >
              <div className="performer-name">
                  <Verified className="verified" />
                  <span className="text-name">@{gallery.performer?.username}</span>
              </div>
          </Link>
         </div>
        )}
      </div>
    );
  }
}

const mapStates = (state: any) => ({
  currentUser: state.user.current,
  performerState: { ...state.performer.performerListing }
});
export default connect(mapStates)(GalleryCard);
