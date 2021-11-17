import { PureComponent, MouseEvent } from 'react';
import { Pagination } from 'antd';
import { connect } from 'react-redux';
import Router from 'next/router';
import { getList } from '@redux/performer/actions';
import { getGalleries } from '@redux/gallery/actions';
import { getVideos } from '@redux/video/actions';
import PerformerCard from '@components/performer-card';
import Search from '@components/search';
import { updateQueryStringParameter } from '@lib/string';
import { SEARCH_TYPES } from '@constants/index';
import VideoCard from '@components/video/video-card';
import GalleryCard from '@components/gallery/gallery-card';

import SEO from './seo';
import Sort from './sort';
import {
  Wrapper,
  Inner,
  Controls,
  PerformerList,
  PaginationControls,
  FilterButton,
  Title,
  ControlWrapper,
  Filter
} from './styled';
import FilterIcon from "@components/icons/filter";
import AllCard from "@components/all-card";

interface IProps {
  getList: Function;
  performerState: any;
  user: any;
  galleryState: any;
  getGalleries: Function;
  getVideos: Function;
  videoState: any;
}

interface IStates {
  offset: number;
  limit: number;
  currentPage: number;
  type: string | null;
  show: boolean;
}

class Performers extends PureComponent<IProps, IStates> {
  static authenticate: boolean = true;

  static noredirect: boolean = true;

  constructor(props: IProps) {
    super(props);
    this.state = {
      offset: 0,
      limit: 12,
      currentPage: 1,
      type: (Router.query?.type as string) || null,
      show: false
    };
    this.handleClickFilterTypeButton = this.handleClickFilterTypeButton.bind(
      this
    );
    this.handleGetList = this.handleGetList.bind(this);
  }

  componentDidMount() {
    const { limit, offset, type } = this.state;

    this.handleGetList({ limit, offset, type });
  }

  async handleGetList({ limit, offset, type }) {
    const { getList: getListHandler, user } = this.props;
    if (type === 'all') {
      this.props.getGalleries({
        limit: limit/3,
        offset,
        status: 'active',
        userId: user?._id || ''
      });
      getListHandler({
        limit: limit/3,
        offset,
        status: 'active',
        userId: user?._id || ''
      });
      this.props.getVideos({
        limit: limit/3,
        offset,
        status: 'active',
        userId: user?._id || ''
      });
    } else if (type === 'photos') {
      this.props.getGalleries({
        limit,
        offset,
        status: 'active',
        userId: user?._id || ''
      });
      getListHandler({
        limit: 75,
        offset,
        status: 'active',
        userId: user?._id || ''
      });
    } else if (type === 'videos') {
      this.props.getVideos({
        limit,
        offset,
        status: 'active',
        userId: user?._id || ''
      });
      getListHandler({
        limit: 75,
        offset,
        status: 'active',
        userId: user?._id || ''
      });
    } else {
      getListHandler({
        limit,
        offset,
        status: 'active',
        userId: user?._id || ''
      });
    }
  }

  async pageChanged(page: number) {
    const { getList: getListHandler, user } = this.props;
    const { limit } = this.state;
    try {
      await this.setState({ currentPage: page });
      getListHandler({
        limit,
        offset: (page - 1) * 12,
        status: 'active',
        userId: user?._id || ''
      });
    } catch (error) {
      // console.log(error);
    }
  }

  handleFilter(values: any) {
    const { getList: getListHandler, user } = this.props;
    const { limit } = this.state;
    this.setState({ offset: 0 });
    getListHandler({
      limit,
      offset: 0,
      ...values,
      status: 'active',
      userId: user?._id || ''
    });
  }

  handleSort(value: string) {
    const sort = {
      sort: value
    };
    const { getList: getListHandler, user } = this.props;
    const { limit } = this.state;
    this.setState({ offset: 0 });
    getListHandler({
      limit,
      offset: 0,
      ...sort,
      status: 'active',
      userId: user?._id || ''
    });
  }

  async handleClickFilterTypeButton(event: MouseEvent<HTMLButtonElement>) {
    const { value } = event.currentTarget;
    updateQueryStringParameter('type', value);
    this.setState({ type: value, offset: 0 });
    await this.handleGetList({
      limit: this.state.limit,
      type: value,
      offset: 0
    });
  }

  render() {
    const {
      performerState = {
        requesting: false,
        error: null,
        success: false,
        data: null
      },
      videoState: { items: videos },
      galleryState: { items: galleries }
    } = this.props;

    const { limit, currentPage, type } = this.state;
    const performers =
      performerState.data && performerState.data.data
        ? performerState.data.data
        : [];
    const total =
      performerState.data && performerState.data.total
        ? performerState.data.total
        : 0;
    const isLoading = performerState.requesting;

    return (
      <>
        <SEO />
        <Wrapper>
          <Inner>
            <Title>Discover models</Title>
            <ControlWrapper>
              <Controls>
                <Search onSubmit={this.handleFilter.bind(this)} />
                <Filter type="button" onClick={() => this.setState({show: !this.state.show})} >
                  <FilterIcon />
                  <span>Filter</span>
                </Filter>
              </Controls>
              { this.state.show ?
              <Controls className="filter">
                <div>
                  {SEARCH_TYPES.map(({ value, label }) => (
                    <FilterButton
                      type="button"
                      key={value}
                      className={type === value ? 'active' : ''}
                      value={value}
                      onClick={this.handleClickFilterTypeButton}
                    >
                      {label}
                    </FilterButton>
                  ))}
                </div>
                <Sort onChange={this.handleSort.bind(this)} />
              </Controls>
              : null }
            </ControlWrapper>
            <PerformerList>
              {type === 'all' &&
                performers.length > 0 &&
                galleries.length > 0 &&
                videos.length > 0 &&
                <AllCard all={{performers: performers, galleries: galleries, videos: videos}} />
              }
              {type === 'models' &&
                performers.length > 0 &&
                !isLoading &&
                performers.map((p: any) => (
                  <PerformerCard performer={p} key={p._id} />
                ))}
              {type === 'videos' &&
                videos &&
                videos.length > 0 &&
                videos.map((video) => <VideoCard video={video} performerState={performers} />)}
              {type === 'photos' &&
                galleries &&
                galleries.length > 0 &&
                galleries.map((gallery) => <GalleryCard gallery={gallery} />)}
            </PerformerList>

            {!total && !isLoading && <p>No model found.</p>}
            {isLoading && <p>loading...</p>}
            {total && total > limit && !isLoading ? (
              <PaginationControls>
                <div className="total">
                  {limit * currentPage - limit === 0
                      ? 1
                      : limit * currentPage - limit
                  } - {limit * currentPage} of {total} items
                </div>
                <Pagination
                  current={currentPage}
                  total={total}
                  pageSize={limit}
                  onChange={this.pageChanged.bind(this)}
                  showSizeChanger={false}
                />
              </PaginationControls>
            ) : null}
          </Inner>
        </Wrapper>
      </>
    );
  }
}

const mapStates = (state: any) => ({
  user: state.user.current,
  performerState: { ...state.performer.performerListing },
  galleryState: { ...state.gallery.listGalleries },
  videoState: { ...state.video.videos }
});

const mapDispatch = { getList, getGalleries, getVideos };
export default connect(mapStates, mapDispatch)(Performers);
