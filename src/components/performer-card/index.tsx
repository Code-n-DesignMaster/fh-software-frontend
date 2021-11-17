import { IPerformer } from 'src/interfaces';
import CameraIcon from '@components/icons/camera';
import PlayerIcon from '@components/icons/player';
import routes from 'server/routes';
import {
  Wrapper,
  Picture,
  Details,
  Left,
  Right,
  Username,
  Counter,
  LastSeen
} from './styled';
import Verified from "@components/icons/verified";
import React from "react";

type Props = {
  performer: IPerformer;
};

const PerformerCard = ({ performer }: Props) => {
  const lastSeen = Math.floor(Math.random() * 3);

  return (
    <routes.Link
      route={`/model/${performer.username}`}
      params={{ username: performer.username }}
    >
      <a>
        <Wrapper>
          <Picture src={performer.avatar || '/no-avatar.png'} />
          <Details>
            <Left>
              <Username><Verified className="verified" /> @{performer.username}</Username>
              <LastSeen active={lastSeen === 0}>
                {lastSeen === 0 ? (
                  'online now'
                ) : (
                  <>
                    online {lastSeen} hours ago
                  </>
                )}
              </LastSeen>
            </Left>
            <Right>
              <Counter>
                <CameraIcon />
                {performer.stats.totalPhotos}
              </Counter>
              <Counter>
                <PlayerIcon />
                {performer.stats.totalVideos}
              </Counter>
            </Right>
          </Details>
        </Wrapper>
      </a>
    </routes.Link>
  );
};

export default PerformerCard;
