import { useState } from 'react';
import { IPerformer } from '@interface/performer';
import PlayerFilledIcon from '@components/icons/player-filled';
import CameraFilledIcon from '@components/icons/camera-filled';
import OffersIcon from '@components/icons/offers';
import Videos from './videos';
import Galleries from './galleries';
import Products from './products';
import { Nav, NavItem, Content, Icon, Title } from './styled';

type TabType = 'video' | 'gallery' | 'store';

type Props = {
  currentUser: any;
  performer: IPerformer;
};

const Tabs = ({ performer, currentUser }: Props) => {
  const [currentTab, setTab] = useState<TabType>('video');

  return (
    <div>
      <Nav>
        <NavItem
          active={currentTab === 'video'}
          onClick={() => setTab('video')}
        >
          <Icon>
            <PlayerFilledIcon />
          </Icon>
          Video
          <span>{performer.stats.totalVideos}</span>
        </NavItem>
        <NavItem
          active={currentTab === 'gallery'}
          onClick={() => setTab('gallery')}
        >
          <Icon>
            <CameraFilledIcon />
          </Icon>
          Photos <span>{performer.stats.totalPhotos}</span>
        </NavItem>
        {Boolean(performer.storeSwitch) && (
          <NavItem
            active={currentTab === 'store'}
            onClick={() => setTab('store')}
          >
            <Icon>
              <OffersIcon />
            </Icon>
            Store <span>{performer.stats.totalProducts}</span>
          </NavItem>
        )}
      </Nav>
      <Content>
        {currentTab === 'video' && (
          <>
            <Title>Videos</Title>
            <Videos performer={performer} currentUser={currentUser} />
          </>
        )}
        {currentTab === 'gallery' && (
          <>
            <Title>Galleries</Title>
            <Galleries performer={performer} currentUser={currentUser} />
          </>
        )}
        {currentTab === 'store' && (
          <>
            <Title>Store</Title>
            <Products performer={performer} currentUser={currentUser} />
          </>
        )}
      </Content>
    </div>
  );
};

export default Tabs;
