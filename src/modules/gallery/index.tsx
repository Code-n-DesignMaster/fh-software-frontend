import { message, Image } from 'antd';
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  paymentService,
  galleryService,
  photoService,
  subscriptionService
} from '@services/index';
import { ICoupon, IGalleryResponse } from 'src/interfaces';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { isMobileDeviceType } from 'src/lib/utils';
import Router from 'next/router';
import Resource from '@components/resource';
import { CartContext } from 'src/context/cart';
import Comments from 'src/modules/comments';
import Details from 'src/modules/resource-details';
import SEO from './seo';
import { Wrapper, Inner, GallerySection, Aside, Title } from './styled';

interface IProps {
  query: any;
  user: any;
  gallery: IGalleryResponse;
  propsPhotos: any;
  isServer: boolean;
  userAgent: boolean;
}

class GalleryViewPage extends PureComponent<IProps> {
  static authenticate: boolean = true;

  static async getInitialProps({ ctx }) {
    const { query, isServer, req } = ctx;
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
    let gallery, propsPhotos;
    try {
      gallery = (await (
        await galleryService.findOne(query.id, {
          Authorization: ctx.token
        })
      ).data) as IGalleryResponse;
      propsPhotos = await (
        await photoService.userSearch(
          query.performerId,
          {
            galleryId: query.id
          },
          {
            Authorization: ctx.token
          }
        )
      ).data.data;
      if (gallery && propsPhotos) {
        return {
          gallery,
          propsPhotos,
          isServer,
          userAgent,
          query
        };
      }
    } catch (e) {
      return {
        query,
        gallery,
        propsPhotos,
        isServer,
        userAgent
      };
    }
  }

  state = {
    includeAdmin: false
  };

  async componentDidMount() {
    const { gallery, isServer, user } = this.props;
    if (!gallery) {
      return Router.push(
        { pathname: '/home', query: { id: user._id } },
        '/home'
      );
    }
    const includeAdmin =
      (user && user.roles && user.roles.includes('admin')) || false;
    this.setState({
      includeAdmin
    });
    if (!isServer && !includeAdmin) {
      galleryService.increaseView(gallery._id);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.gallery &&
      prevProps.gallery._id !== this.props.gallery._id
    ) {
      const gallery = this.props.gallery;
      if (!this.state.includeAdmin) {
        galleryService.increaseView(gallery._id);
      }
    }
  }

  async buyGallery(token: string) {
    const payload: any = { paymentToken: token };

    const response = await paymentService.purchaseGallery(
      this.props.gallery._id,
      payload
    );

    if (response.data.success) {
      window.location.reload();
    } else {
      message.error('Error occurred, please try again later');
    }
  }

  async subscribeFree() {
    await (
      await subscriptionService.freeSubscribed({
        userId: this.props.user._id,
        performerId: this.props.gallery.performer._id,
        status: 'active'
      })
    ).data;
    window.location.reload();
  }

  async subscribeMonthly(token: string) {
    const response = await paymentService.subscribe({
      type: 'monthly',
      performerId: this.props.gallery.performer._id,
      paymentToken: token
    });

    if (response.data.success) {
      window.location.reload();
    } else {
      message.error('Error occurred, please try again later');
    }
  }

  render() {
    const { gallery, isServer, userAgent, propsPhotos } = this.props;
    const galleryPhotos = propsPhotos;
    const isMobileDevice = isMobileDeviceType(isServer, userAgent);

    return (
      <>
        <SEO gallery={gallery} />
        <Wrapper>
          <Inner>
            <GallerySection>
              <Resource
                user={this.props.user}
                resource={gallery}
                isInCart={this.context.hasItem(gallery._id)}
                onAddToCart={() => this.context.addItem(gallery)}
                onSubscribe={this.subscribeMonthly.bind(this)}
                onSubscribeFree={this.subscribeFree.bind(this)}
                onBuy={this.buyGallery.bind(this)}
              >
                <div className="photos-slider">
                  <Carousel>
                    {galleryPhotos?.map((photo) =>
                      isMobileDevice ? (
                        <Image
                          src={photo && photo.photo && photo.photo.url}
                          key={photo._id}
                        />
                      ) : (
                        <img
                          src={photo && photo.photo && photo.photo.url}
                          key={photo._id}
                        />
                      )
                    )}
                  </Carousel>
                </div>
              </Resource>

              <Title>{gallery.name}</Title>
            </GallerySection>
            <Aside>
              <Details
                resource={gallery}
                type="gallery"
                currentUser={this.props.user}
              />
              <Comments objectId={gallery._id} currentUser={this.props.user} />
            </Aside>
          </Inner>
        </Wrapper>
      </>
    );
  }
}

GalleryViewPage.contextType = CartContext;

const mapStates = (state: any) => ({
  user: state.user.current
});

export default connect(mapStates, null)(GalleryViewPage);
