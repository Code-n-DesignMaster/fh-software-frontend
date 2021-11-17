import { useState } from 'react';
// import Link from 'next/link';
import { message } from 'antd';
import LikeIcon from '@components/icons/like';
import { IVideoResponse } from '@interface/video';
import { IGalleryResponse } from '@interface/gallery';
import { IUser } from '@interface/user';
import { reactionService } from '@services/reaction.service';
import routes from 'server/routes';
import {
  Wrapper,
  Creator,
  Avatar,
  Username,
  Description,
  Tags,
  Divider,
  Stats,
  ViewCount,
  LikeButton
} from './styled';

type Props = {
  resource: IVideoResponse | IGalleryResponse;
  type: 'video' | 'gallery';
  currentUser: IUser;
};

const Details = ({ resource, type, currentUser }: Props) => {
  const [liked, setLiked] = useState(resource.userReaction.liked);
  const [stats, setStats] = useState(resource.stats);

  const toggleLike = async () => {
    try {
      if (!liked) {
        const react = await (
          await reactionService.create({
            objectId: resource._id,
            action: 'like',
            objectType: type
          })
        ).data;
        if (react) {
          setLiked(true);
          setStats((prev) => ({
            ...prev,
            likes: prev.likes + 1
          }));
          message.success('Liked');
        }
      } else {
        const react = await reactionService.delete({
          objectId: resource._id,
          action: 'like',
          objectType: type
        });
        if (react) {
          setLiked(false);
          setStats((prev) => ({
            ...prev,
            likes: prev.likes - 1
          }));
          message.success('Unliked');
        }
      }
    } catch (e) {
      const err = await e;
      message.error(err.message || 'Error occurred, please try again later');
    }
  };

  return (
    <Wrapper>
      <Creator>
        <Avatar
          src={resource.performer.avatar || '/user.png'}
          alt={resource.performer.username}
        />
        <div>
          <routes.Link
            route={`/model/${resource.performer.username}`}
            params={{ username: resource.performer.username }}
          >
            <Username>@{resource.performer.username}</Username>
          </routes.Link>
        </div>
      </Creator>
      <Description>{resource.description}</Description>
      {'tags' in resource && (
        <Tags>
          {resource.tags.map((tag) => {
            return <li key={tag}>#{tag}</li>;
          })}
        </Tags>
      )}

      <Divider />
      <Stats>
        <ViewCount>{resource.stats.views} views</ViewCount>
        <LikeButton onClick={toggleLike} active={liked} disabled={!currentUser}>
          <LikeIcon />
          <span>{stats.likes}</span>
        </LikeButton>
      </Stats>
    </Wrapper>
  );
};

export default Details;
